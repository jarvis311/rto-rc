import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Card, Form } from 'react-bootstrap';
import LogoMini from '../Component/Logo-mini';
import { useNavigate } from 'react-router-dom'
import { API, AuthContext } from '../App';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Login = () => {
  // const token = Cookies.get("token");
  const { permission, setPermission } = useContext(AuthContext)
  const navigate = useNavigate()
  const [eye, seteye] = useState(true);
  const [eyetype, seteyetype] = useState("password")
  const [email, setemail] = useState(localStorage.getItem('email') ? localStorage.getItem('email') : "")
  const [password, setpassword] = useState(localStorage.getItem('password') ? localStorage.getItem('password') : "");
  const [remeber, setRemeber] = useState(localStorage.getItem('email') && localStorage.getItem('password') ? true : false)

  const [type, settype] = useState(false);


  const Remeber = (e) => {
    setemail(email)
    setpassword(password)
    setRemeber(e.target.checked)

  }

  const Eye = () => {
    if (eyetype == "password") {
      seteyetype("text");
      seteye(false);
      settype(true);
    }
    else {
      seteyetype("password");
      seteye(true);
      settype(false);
    }
  }

  const LoginData = async (e) => {
    e.preventDefault()

    if (remeber === false) {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    }
    else {
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
    }

    const formdata = new FormData()
    formdata.append("email", email)
    formdata.append("password", password)
    const result = await API.post("/api/user/user_login", formdata)
    console.log('result=====>????', result)
    if (result.data.status === true) {
      Cookies.set("fmljwt", result.data.data.auth, { expires: new Date(Date.now() + 30 * 60 * 1000) })
      toast.success("Login Successfully")
      navigate("/home")
    } else {
      toast(`${result.data.response_message}`);
    }
  }

  return (
    <>
      <div className='position-relative'>
        <Container>
          <div className="auth">
            <div className="auth-box">
              <Card>
                <Card.Header className="pb-0">
                  <div className='auth-logo'>
                    <img src="../logo/rto.png" className='logo-mini' alt="Remote Control for All TV" />
                  </div>
                </Card.Header>
                <Card.Body>
                <Form onSubmit={LoginData} method='post'>
                  <h1 className='auth-title'>Sign in</h1>
                  <h2 className='auth-subtitle'>RTO Vehicle Information</h2>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" className="my-2" placeholder="Enter Your Email" value={email} onChange={(e) => setemail(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-4 input-prefix">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={eye ? "password" : "text"} className="my-2" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                    <i onClick={Eye} className={`bx ${eye ? "bx-hide" : "bx-show"}`}></i>
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember Me" checked={remeber} onChange={e => Remeber(e)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 ">Sign In</Button>
                </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Login