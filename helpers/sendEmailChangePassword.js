const {email, password} = require('../constants/mailCredential');
const mailer = require('nodemailer');
const passTokenGenerator = require('../helpers/tokinazer').password;
module.exports = async (user, method) => {

    const transport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });

    const info = await transport.sendMail({
        from: email,
        to: 'victor.fzs10@gmail.com',
        subject: 'Password change on perfect social network',
        html: buildTemplate(user)
    });
    return info.response;
};

function buildTemplate(user) {
    let token = passTokenGenerator({user});
    const html =
        `<h1> Password change </h1>
         <br>
         Someone wants to change password on localhost:3000.
         <br>
         If its you please click 
         <form action="http://localhost:3000/auth/user/password?t=${token}&password=666&passwordCopy=666" method="post">
         <input type="submit" value="here"> 
         `;
    return html;
}
