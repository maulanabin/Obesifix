export default class Token {
  constructor(id, user_id, refresh_token, created_at, updated_at) {
    this.id = id;
    this.user_id = user_id;
    this.refresh_token = refresh_token;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
