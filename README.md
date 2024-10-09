## 3 ways for sending token
- In body i.e. in `req.body`
- In Headers like `Authorization: Bearer <token>`
- In Cookies `req.cookies` for which cookie-parser has to be installed

## Accessing Token
- `req.body.token`
- `req.header("Authorization").replace("Bearer ", "")`
- `req.cookies.token`

#### According to Documentation most safest and best way to send token is through headers