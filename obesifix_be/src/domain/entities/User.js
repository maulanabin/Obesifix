export default class User {
  constructor(
    id,
    name,
    email,
    password,
    age,
    gender,
    height,
    weight,
    activity,
    picture,
    food_type,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.activity = activity;
    this.picture = picture;
    this.food_type = food_type;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
