import {init} from 'emailjs-com';
import emailjs from 'emailjs-com';


export default function sendEmail(verification, params) {
    init("user_ZDZu5NBczXXej5LkgEug2");
    return new Promise((resolve, reject) => {
        if (verification) {
            emailjs.send("service_gmail_bpfmgr", "template_verification", params)
            .then(res => resolve(res))
            .catch(err => reject(err));
        } else {
            emailjs.send("service_gmail_bpfmgr", "template_password", params)
            .then(res => resolve(res))
            .catch(err => reject(err));
        }
    })
}