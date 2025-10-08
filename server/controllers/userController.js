import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import transactionModel from '../models/transactionModel.js';

// Helper to create Razorpay instance safely
function getRazorInstance() {
  const keyId = process.env.RAZOR_KEY_ID;
  const keySecret = process.env.RAZOR_KEY_SECRET;
  if (!keyId || !keySecret) {
    return null;
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const jwtSecret = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
    const token = jwt.sign({ id: user._id }, jwtSecret);
    res.json({ success: true, token, user: { name: user.name } });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const jwtSecret = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
      const token = jwt.sign({ id: user._id }, jwtSecret);
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    res.json({ success: true, credits: user.creditBalance, user: { name: user.name } });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const paymmentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData || !planId) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case 'Basic':
        plan = 'Basic';
        credits = 100;
        amount = 10;
        break;
      case 'Advanced':
        plan = 'Advanced';
        credits = 500;
        amount = 50;
        break;
      case 'Business':
        plan = 'Business';
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "Plan not found" });
    }

    date = Date.now();
    const transactionData = {
      userId, plan, amount, credits, date
    };

    const newTransaction = await transactionModel.create(transactionData);

    const currency = process.env.CURRENCY || 'INR';

    const razor = getRazorInstance();
    if (!razor) {
      return res.json({ success: false, message: "Payment configuration missing. Contact support." });
    }

    const options = {
      amount: amount * 100,
      currency,
      receipt: newTransaction._id.toString()
    };

    await razor.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: String(error?.message || error) });
      }
      res.json({ success: true, order });
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const verifyRazorpay=async(req,res)=>{
  try {
    const { razorpay_order_id } = req.body;

    const razor = getRazorInstance();
    if (!razor) {
      return res.json({ success: false, message: "Payment configuration missing. Contact support." });
    }

    const orderInfo = await razor.orders.fetch(razorpay_order_id);

    if(orderInfo.status == 'paid'){
      const transactionData = await transactionModel.findById(orderInfo.receipt)

      if(transactionData.payment){
        return res.json({success:false,message:'Payment already processed'})
      }

      const userData = await userModel.findById(transactionData.userId)

      const creditBalance = userData.creditBalance + transactionData.credits

      await userModel.findByIdAndUpdate(userData._id,{creditBalance})

      await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})

      res.json({success:true,message:'credits added'})
    }
    else{
      res.json({success:false,message:'Payment Failed'})
    }

  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

export { registerUser, loginUser, userCredits, paymmentRazorpay,verifyRazorpay };
