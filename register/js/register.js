import { app, db } from '/firebase.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'

const registerForm = document.getElementById('register-form')

// Xu ly khi nguoi dung bam nut Dang ky
registerForm.onsubmit = function (event) {
  event.preventDefault()

  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const confirmPassword = document.getElementById('confirm-password')

  const emailError = document.getElementById('email-error')
  const passwordError = document.getElementById('password-error')
  const confirmPasswordError = document.getElementById('confirm-password-error')

  // Kiểm tra
  if (email.value === '') {
    emailError.innerHTML = 'Vui lòng nhập Tên đăng nhập'
  } else {
    emailError.innerHTML = ''
  }

  if (password.value === '') {
    passwordError.innerHTML = 'Vui lòng nhập Mật khẩu'
  } else {
    passwordError.innerHTML = ''
  }

  if (confirmPassword.value === '') {
    confirmPasswordError.innerHTML = 'Vui lòng nhập lại Mật khẩu'
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.innerHTML = 'Mật khẩu không trùng'
  } else {
    confirmPasswordError.innerHTML = ''
  }

  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      // Signed up
      const user = userCredential.user
      alert('Dang ky thanh cong')
      window.location.href = '/'
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
      alert(errorMessage)
    })
}
