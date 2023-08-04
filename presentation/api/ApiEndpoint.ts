export class ApiEndpoint {
  private readonly bpmcApi = process.env.BASE_URL
  private readonly humgApi = process.env.HUMG_API_URL
  private readonly auth = '/auth'
  private readonly login = '/login'
  private readonly forgetPassword = '/forget-password'
  private readonly resetMail = '/selfreset-password'
  private readonly logout = '/logout'

  readonly LOGIN = this.humgApi + this.auth + this.login
  readonly FORGET_PASSWORD = this.humgApi + this.auth + this.forgetPassword
  readonly RESET_MAIL = this.humgApi + this.auth + this.resetMail
  readonly LOGOUT = this.humgApi + this.auth + this.logout
}

export const apiEndpoint = new ApiEndpoint()
