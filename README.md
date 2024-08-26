## It's MYGO!!!

### How to run
- Run server
```shell
    cd backend && docker compose up -d --build
```
- Remove images
```shell
    cd backend && docker compose down --rmi all
```

- Start each microservice separately; the web and mobile terminals are used for debugging.
    - web
    ```shell
        cd web && npm start
    ```
    - mobile
    ```shell
        cd mobile/App && npm start
    ```
    - user microservice
    ```shell
        cd backend/app/usercenter/api && go run usercenter.go
    ```
    - media microservice
    ```shell
        cd backend/app/media/api && go run media.go
    ```
    - audio analysis microservice
    ```shell
        cd backend/app/audioanalysis && source .venv/bin/activate && python3 consumer.py
    ```


### How to use

---
#### Web
##### Section 1: Welcome page
- New user should register an account. The password must include uppercase and lowercase letters, special characters, and be longer than 8 characters.
![w1.png](./Docs/img/w1.png)
![w2.png](./Docs/img/w2.png)
- Once you have an account you can login by enter email and password. If you forget the password, you can reset it.
![w3.png](./Docs/img/w3.png)
![w4.png](./Docs/img/w4.png)

##### Section 2: Sub-user management
- The web client can only be used by the account owner, usually parents. They can create multiple sub accounts.
![w5.png](./Docs/img/w5.png)
- You can view each sub-user's basic information and music practice records
![w6.png](./Docs/img/w6.png)
- You can edit sub user’s information.
![w7.png](./Docs/img/w7.png)

##### Section 3: Historical performance details page
On the details page, we can view various data for each performance, such as the user's performance and the corresponding reference performance's video and audio, the generated visualized images, sheet music, and summary reports.
- View reference performance video.
![w8.png](./Docs/img/w8.png)
- View user performance audio.
![w9.png](./Docs/img/w9.png)
- View sheet music generated based on the reference performance video.
![w10.png](./Docs/img/w10.png)
- View feedback report.
![w15.png](./Docs/img/w15.png)
- Based on the feedback report, we can obtain the user's note accuracy, dynamic accuracy, and rhythm accuracy, as well as identify the notes where the user made errors during the performance.
  - For example, based on the following section of the report, we can see that the user missed D4 on the third beat of the fourth measure.
![w16.png](./Docs/img/w16.png)
  - Below are the sheet music generated from the user's performance and the sheet music generated from the reference performance. We can clearly identify the notes that were missed in the user's performance.
![w13.png](./Docs/img/w13.png)
![w14.png](./Docs/img/w14.png)
  - Similarly, based on the visualized waterfall chart, we can also identify the notes that the user played incorrectly, missed, or played extra during the performance.
![w11.png](./Docs/img/w11.png)
![w12.png](./Docs/img/w12.png)

#### App
##### Section 1: Welcome Screen
![Image 1](./Docs/img/1.png)
![Image 2](./Docs/img/2.png)

The password must include uppercase and lowercase letters, special characters, and be longer than 8 characters.

![Image 3](./Docs/img/3.png)

You should wait for verification code from your email and input it.

PS: If you accidentally exit while verifying your email, please log in with the email you registered and continue verifying your email.

![Image 4](./Docs/img/4.png)
![Image 5](./Docs/img/5.png)
![Image 6](./Docs/img/6.png)

---

##### Section 2: Sub-User Screen


![Image 7](./Docs/img/7.png)

If you haven't created a sub-user for your account on the web, please click the plus sign to create your first sub-user.

PS:The PIN must be a four-digit number.

![Image 8](./Docs/img/8.png)

Double-click the icon to enter the sub-user.

![Image 9](./Docs/img/9.png)

---

##### Section 3: Configuration Screen


![Image 10](./Docs/img/10.png)

After entering the sub-user for the first time, you will need to fill out the configuration information.

PS: Can be modified in user screen.

![Image 11](./Docs/img/11.png)
![Image 12](./Docs/img/12.png)
![Image 13](./Docs/img/13.png)
![Image 14](./Docs/img/14.png)

---

##### Section 4: Home Screen

![Image 15](./Docs/img/15.png)

If you want to upload your own reference music (which can be either audio or video), you can use it as a reference (the AI will analyze based on the reference music you upload).

![Image 16](./Docs/img/16.png)

You need to upload an image for your reference music, and then upload the music or video.

Then, fill in the reference music's title (required), style (required), composer, and the instruments used.

PS: Currently, our app can only search based on style and only recognizes "Classic." So for now, please only enter "Classic" for the style, or else it won't be found in the search.

![Image 17](./Docs/img/17.png)
![Image 18](./Docs/img/18.png)
![Image 19](./Docs/img/19.png)
![Image 20](./Docs/img/20.png)
![Image 21](./Docs/img/21.png)

Click Upload Reference to finish your operation.

![Image 22](./Docs/img/22.png)
![Image 23](./Docs/img/23.png)
![Image 24](./Docs/img/24.png)
![Image 25](./Docs/img/25.png)

Double-click the music you want to practice

![Image 26](./Docs/img/26.png)
![Image 27](./Docs/img/27.png)

You can view the video or play the music

![Image 28](./Docs/img/28.png)

Upload your video or audio

![Image 29](./Docs/img/29.png)
![Image 30](./Docs/img/30.png)

Waiting for AI Analysis(according to the size of file)

![Image 31](./Docs/img/31.png)
![Image 32](./Docs/img/32.png)
![Image 33](./Docs/img/33.png)
![Image 34](./Docs/img/34.png)
![Image 35](./Docs/img/35.png)
![Image 36](./Docs/img/36.png)
![Image 37](./Docs/img/37.png)
![Image 38](./Docs/img/38.png)
![Image 39](./Docs/img/39.png)
![Image 40](./Docs/img/40.png)
![Image 41](./Docs/img/41.png)
![Image 42](./Docs/img/42.png)
![Image 43](./Docs/img/43.png)
![Image 44](./Docs/img/44.png)
![Image 45](./Docs/img/45.png)
![Image 46](./Docs/img/46.png)
