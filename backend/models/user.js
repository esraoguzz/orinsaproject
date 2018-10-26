/** user.js **/
function User(data) {
  /*from   w ww  .  j  av a2 s  .c om*/
  // Properties go here
  this.username = data.username;
  this.password =data.password;
  this.hint =data.hint;
  this.answerhint =data.answerhint;
  this.typeMember= data.typeMember;
  this.mobilephone = data.mobilephone; 
}
// Member functions go here:
/* someClass.prototype.someMemberFunction = function () {
    this.someProperty = 'modified value'; 
    console.log("called from prototype");
 }*/

module.exports = User;