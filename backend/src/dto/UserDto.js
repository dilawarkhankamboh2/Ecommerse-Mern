 
 class UserDto {

  constructor(user) {

    this._id = user._id;
    this.fullName = user.fullName;
    this.username = user.username;
    this.email = user.email;
    this.avator = user.avator;
    this.role= user.role;
    
  }
}

module.exports= UserDto;
