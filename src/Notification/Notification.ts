import { notify as notifier } from 'react-notify-toast'
import autobind from 'autobind-decorator'
const defaultErrorMessage = 'There was a problem, please try again'

@autobind
class NotifyUser {
  public constructor(
    private notify: {
      show: (message: string, type?: string, timeout?: number) => void
    }
  ) {}

  public withError(message: string | string[]) {
    if (typeof message === 'string') {
      this.showError(message)
    } else if (Array.isArray(message)) {
      message.forEach(text => {
        this.showError(text || defaultErrorMessage)
      })
    } else {
      this.showError(defaultErrorMessage)
    }
  }

  public withSuccess(message: string | string[]) {
    if (typeof message === 'string') {
      this.showSuccess(message)
    } else if (Array.isArray(message)) {
      message.forEach(text => {
        this.showSuccess(text)
      })
    }
  }

  public withInfo(message: string | string[]) {
    if (typeof message === 'string') {
      this.showInfo(message)
    } else if (Array.isArray(message)) {
      message.forEach(text => {
        this.showInfo(text)
      })
    }
  }

  private showError(message: string) {
    this.notify.show(message, 'error', 6000)
  }

  private showSuccess(message: string) {
    this.notify.show(message, 'success', 6000)
  }

  private showInfo(message: string) {
    this.notify.show(message, 'warning', 6000)
  }
}

const UserNotifier = new NotifyUser(notifier)

export default UserNotifier
