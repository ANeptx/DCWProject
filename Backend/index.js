const express = require('express')
const app = express()
const PORT = 80
const cors = require('cors')
const passport = require('passport')
const cookie = require('cookie')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')
const router = require('express').Router()

const db = require('./database.js')
let users = db.users
require('./passport.js')



app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))

router.use(express.json())
router.use(express.urlencoded({ extended: false }))


let anime = [
        {
            id: 1, 
            name: "Spy x Family",
            genre: "แอ็กชัน, ตลก, สายลับ",
            author: "ทัตสึยะ เอนโด",
            release: "9 เมษายน 2565",
            image: "https://www.โอตาคุแว่นผู้หนึ่ง.com/wp-content/uploads/2021/10/SPYxFAMILY-Cover.png",
            episode: 3
        },

        {
            id: 2, 
            name: "My Dress-Up Darling",
            genre: "ตลก, เสี้ยวชีวิต",
            author: "ชินอิจิ ฟูกูดะ",
            release: "9 มกราคม 2565",
            image: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/03/my-dress-up-darling.jpg",
            episode: 12
        },

        {
            id: 3, 
            name: "Kimetsu no Yaiba",
            genre: "ผจญภัย, ดาร์กแฟนตาซี",
            author: "โคโยฮารุ โกโตเกะ",
            release: "6 เมษายน 2562",
            image: "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/6089/1106089-h-ce37af447f30",
            episode: 44
        },

        {
            id: 4, 
            name: "Jujutsu Kaisen",
            genre: "ต่อสู้, ผจญภัย, เหนือธรรมชาติ",
            author: "โคโยฮารุ โกโตเกะ",
            release: "6 เมษายน 2562",
            image: "https://wallpaperchain.com/wp-content/uploads/2022/01/jujutsu-kaisen-wallpaper-background.jpg",
            episode: 24
        },
    ]


//------------------------------------ API Anime --------------------------------------------
router
  .route("/anime")
  .get((req, res) => res.json(anime))
  .post((req, res) => {
    try {
      let newAnime = {};
      newAnime.id = anime.length ? anime[anime.length - 1].id + 1 : 1;
      newAnime.name = req.body.name;
      newAnime.genre = req.body.genre;
      newAnime.author = req.body.author;
      newAnime.image = req.body.image;
      newAnime.release = req.body.release;
      newAnime.episode = req.body.episode;

      anime = [...anime, newAnime];
      res.json(anime);
    } catch {
      res.json({ status: "Fail!" });
    }
  });

  router
  .route("/anime/:anime_id")
  .get((req, res) => {
    let ID = anime.findIndex((item) => item.id === +req.params.anime_id);
    if (ID >= 0) {
      res.json(anime[ID]);
    } else {
      res.json({ status: "Can't Find" });
    }
  })
  .put((req, res) => {
    let ID = anime.findIndex((item) => item.id === +req.params.anime_id);
    if (ID >= 0) {
      anime[ID].name = req.body.name;
      anime[ID].genre = req.body.genre;
      anime[ID].author = req.body.author;
      anime[ID].image = req.body.image;
      anime[ID].release = req.body.release;
      anime[ID].episode = req.body.episode;

      res.json(anime[ID]);
    } else {
      res.json({ status: "Can't Update" });
    }
  })
  .delete((req, res) => {
    let ID = anime.findIndex((item) => item.id === +req.params.anime_id);
    if (ID >= 0) {
      anime = anime.filter((item) => item.id !== +req.params.anime_id);
      res.json(anime);
    } else {
      res.json({ status: "Can't Delete" });
    }
  });

  //---------------------------------- API Login & Logout & Profile & Register ------------------------------------------------
router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.get('/alluser', (req, res) => res.json(db.users.users))

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: (req.body.ischeck === "on") ? '7d' : '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

/* GET user profile. */
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      res.send(req.user);
    }
  );

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
