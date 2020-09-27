import express from "express";
import axios from "axios";
import * as bp from "body-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan("tiny"));

const pushController = async (req, res) => {
    console.log(req.body);

    /*     
    ! baca docnya disni 
    ? https://docs.expo.io/push-notifications/sending-notifications/

    ! atau kalau mau pake SDKnya coba disni
    ? https://github.com/expo/expo-server-sdk-node

    ! ini kalau mau coba yang udah ada webnya, 
    ! tinggal masukin token yang tadi di dpt dari frontend
    ? https://expo.io/notifications
    */

    // contoh:
    // to:"ExponentPushToken[z9p7OPKISveJHgEJ8Z4V1n]",
    /* 
    ? IOS dan Android wajib pakai https buat request, server
    ? jdi manual aja pake postman hit endpoint ini ganti token yg baru 
    */
    const notif = {
        to: "<ganti_token_tadi>",
        sound: "default",
        title: "Ini Title",
        body: "And here is the body!",
        data: { data: "goes here" }
    };
    try {
        await axios({
            method: "POST",
            url: "https://exp.host/--/api/v2/push/send",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(notif)
        });
        await res.json({
            ok: "Siap"
        });
    } catch (e) {
        res.json({ error: "Gatau Error Ajalah" });
    }
};

app.post("/push", [pushController]);

app.listen(5000, () => {
    console.log("server run in http://localhost:5000");
});
