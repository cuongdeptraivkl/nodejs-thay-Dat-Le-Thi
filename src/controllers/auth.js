import bcrypt from "bcrypt"; // Tải vào module bcrypt để mã hóa mật khẩu.
import jwt from "jsonwebtoken"; //Tải vào module jsonwebtoken để tạo và xác thực token.
import User from "../models/user";//Tải vào model User để tương tác với cơ sở dữ liệu.
import dotenv from "dotenv"; //: Tải vào module dotenv để đọc các biến môi trường trong tệp .env.                
dotenv.config();
import { singupSchema } from "../schema/auth";// Tải vào schema dùng để kiểm tra đầu vào của API.

export const singup = async (req, res) => { //: Xuất hàm singup để xử lý yêu cầu đăng ký người dùng.
try {
const { name, email, password, confirmPass } = req.body;
const { error } = singupSchema.validate(req.body, { abortEarly: false });//iểm tra đầu vào bằng schema và lấy lỗi (nếu có).
if (error) { // Nếu có lỗi, trả về phản hồi không thành công với thông báo lỗi.
    const errors = error.details.map((err) => err.message);
    return res.status(404).json({
      message: errors,
    });
  }
  
  // kiểm tra tồn tại của email
  const userExist = await User.findOne({ email });
  if (userExist) { //Nếu email đã tồn tại, trả về phản hồi không thành công với thông báo lỗi.
    return res.status(400).json({
      message: "Email đã tồn tại",
    });
  }
  
  // mã hóa mật khẩu bằng bcrypt với độ mạnh là 10.
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Tạo một người dùng mới trong cơ sở dữ liệu.
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  
  user.password = undefined; //Xóa trường mật khẩu của người dùng trước khi trả về phản hồi.
  
  // tạo token để authenticate
  //Tạo một token JWT để xác thực người dùng.
  const token = jwt.sign(
    { _id: user._id },
    process.env.SECRET_KEY,
    { expiresIn: 60 * 60 }
  );
  
  // trả về phản hồi thành công với thông tin người dùng mới tạo và token JWT.
  return res.status(201).json({
    message: "Đăng ký thành công",
    accessToken: token,
    user,
  });
} catch (error) {
    console.log(error);
    return res.status(500).json({
    message: "Đã có lỗi xảy ra",
    });
    }
    };  