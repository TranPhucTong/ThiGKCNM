//const { request, response } = require('express');
const express = require('express');
const multer = require('multer');

//const data = require("./store");
const app = express();
const upload = multer();


//app.use(express.json({ extended: false }));
app.use(express.static('./views'));
app.set('view engine', 'ejs');
app.set('views', './views');


// P2
const AWS = require('aws-sdk')
const { request, response } = require('express');
const config = new AWS.Config({
    accessKeyId: 'AKIAUEOKCKBOIZFRKZ5E',
    secretAccessKey: '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',
    region: 'ap-southeast-1'
});
AWS.config = config;

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'BaiBao';

app.post('/', upload.fields([]), (req, res) => {
    const { ma_bb, ten_bb, ten_ntg, chi_so, so_trang, nam_xb, avatar_url } = req.body;

    const params = {
        TableName: tableName,
        Item: {
            ma_bb: parseInt(ma_bb),
            ten_bb,
            // ten_ntg,
            // chi_so,
            // so_trang,
            // nam_xb,
            avatar_url
        }
    }

    docClient.put(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            return res.redirect("/")
        }
    })
});

app.post("/delete", upload.fields([]), (req, res) => {
    const listItems = Object.keys(req.body);

    if (listItems.length === 0) {
        return res.redirect("/");
    }

    function onDeleteItem(index) {
        const params = {
            TableName: tableName,
            Key: {
                "ma_bb": parseInt(listItems[index])
            }
        }

        docClient.delete(params, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (index > 0) {
                    onDeleteItem(index - 1);
                } else {
                    return res.redirect("/");
                }
            }
        })
    }
    onDeleteItem(listItems.length - 1);
});


app.get('/', (request, response) => {
    const params = {
        TableName: tableName,
    };

    docClient.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log('data =', data.Items)
            return response.render('index', { baiBaos: data.Items });
        }
    });
});
// P2


// app.get('/', (request, response) => {
//     data = [{ stt: '1', ten_mh: 'Co so du lieu', loai_mh: 'Co so', hocKy: 'HK1-2020-2021', khoa: 'K.CNTT' },
//         { stt: '2', ten_mh: 'Cau truc du lieu', loai_mh: 'Co so', hocKy: 'HK1-2020-2021', khoa: 'K.CNTT' },
//         { stt: '3', ten_mh: 'Cong nghe phan mem', loai_mh: 'Co so nganh', hocKy: 'HK1-2020-2021', khoa: 'K.CNTT' },
//         { stt: '4', ten_mh: 'Cong nghe moi', loai_mh: 'Chuyen nganh', hocKy: 'HK1-2020-2021', khoa: 'K.CNTT' },
//         { stt: '5', ten_mh: 'Do an mon hoc', loai_mh: 'Chuyen nganh', hocKy: 'HK1-2020-2021', khoa: 'K.CNTT' }
//     ]
//     return response.render('index', { data: data });
// });

// app.post('/', upload.fields([]), (req, res) => {
//     data.push(req.body);
//     return res.redirect('/');
// });

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});