import joi from "joi";

export const singupSchema = joi.object({
    name:joi.string(),
    email: joi.string().required().email().message({
        "string.email":"Email không đúng định dạng",
        "string.empty":"Email không được để trống",
        "any.required":"trường email là bắt buộc"
    }),
    password:joi.string().required().min(6).message({
        "string.min":"Password phải có ít nhất {#limit} ký tự",
        "string.empty":"Password không được để trống",
        "any.required":"trường Password là bắt buộc"
    }),
    confirmPassword:joi.string().valid(joi.ref("password")).required().messages({
        "any.only":"password không trùng",
        "any.required":"trường confirm Password là bắt buộc"
    })
});