const {check, body, validationResult} = require("express-validator");

const validate_login = () =>{
    return [
        check('username', 'Vui lòng nhập tên đăng nhập!').not().isEmpty(),
        check('username', 'Vui lòng không nhập ký tự đặc biệt!').isAlphanumeric(),
        check('username', 'Vui lòng nhập ít nhất 6 ký tự!').isLength({min:6}),
        check('password', 'Vui lòng nhập mật khẩu!').not().isEmpty(),
        check('password', 'Vui lòng nhập 6 - 20 ký tự!').isLength({min:6, max:20}),
    ]
}

const validate_register = () =>{
    return [
        check('username', 'Vui lòng nhập tên đăng nhập!').not().isEmpty(),
        check('username', 'Vui lòng không nhập ký tự đặc biệt!').isAlphanumeric(),
        check('username', 'Vui lòng nhập ít nhất 6 ký tự!').isLength({min:6}),
        check('password', 'Vui lòng nhập mật khẩu!').not().isEmpty(),
        check('password', 'Vui lòng nhập 6 - 20 ký tự!').isLength({min:6, max:20}),
        check('full_name', 'Vui lòng nhập họ và tên!').not().isEmpty(),
        check('full_name')
            .custom(value => /[A-Za-z ]/.test(value))
            .withMessage('Vui lòng không nhập ký tự đặc biệt và số!'),
        check('age', 'Vui lòng nhập không nhập ký tự đặc biệt và chữ!').isNumeric(),
        check('phone_number', 'Vui lòng nhập số điện thoại!').not().isEmpty(),
        check('phone_number', 'Vui lòng không nhập ký tự đặc biệt!').isMobilePhone(),
        check('email', 'Vui lòng nhập đúng email').isEmail(),
        check('city')
            .custom(value => /[A-Za-z ]/.test(value))
            .withMessage('Vui lòng nhập tỉnh/thành phố đang lưu trú! \n- Không nhập ký tự đặc biệt!'),
        check('district')
            .custom(value => /[A-Za-z0-9 ]/.test(value))
            .withMessage('- Vui lòng nhập quận/huyện đang lưu trú!\n- Không nhập ký tự đặc biệt!'),
        check('address')
            .custom(value => /[A-Za-z0-9{,./ } ]/.test(value))
            .withMessage('Vui lòng nhập địa chỉ đang lưu trú cụ thể!'),
    ]
}

const validation_result = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(402).json({errors: errors.array()});
    }
    next();
}

module.exports = {validate_login, validate_register,validation_result}