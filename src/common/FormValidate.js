const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const panRegex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
const stringRegex = /^([a-z0-9]{4,})$/;
const nameRegex = /^[a-zA-Z ]*$/;
const dobRegex =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
class FormValidate {
  emailRegex;
  phoneRegex;
  stringRegex;
  dobRegex;
  constructor() {
    this.emailRegex = emailRegex;
    this.phoneRegex = phoneRegex;
    this.panRegex = panRegex;
    this.stringRegex = stringRegex;
    this.nameRegex = nameRegex;
    this.dobRegex = dobRegex;
  }
  isEmpty(...data) {
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) return true;
    }
    return false;
  }
  isEmail(email) {
    return this.emailRegex.test(email);
  }
  isPhone(phone) {
    return this.phoneRegex.test(phone);
  }
  isString(name) {
    return name && name.length > 2;
  }
  validatePan(name) {
    return this.panRegex.test(name.toUpperCase());
  }
  validateName(name) {
    return this.nameRegex.test(name) && name.length > 2;
  }
  isValidDate(dob) {
    return this.dobRegex.test(dob);
  }
}
export default new FormValidate();
