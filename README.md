# Mid Project for Career Track program at Alchemy Code Lab

Tess Lameyer, Lisa Carpenter, Ian Andrewson, Alan Hermanns, Ben Beekman

## GOAL:

## TECH STACK:

Frameworks
-Node.js
-Python

Database

- Mongoose/MongoDB on Heroku server
- Raspberry Pis use HTTP requests (request library) to post to the express HTTP server on Heroku.

## HARDWARE:

### Raspberry Pi

Our development and testing used Raspberry Pi 4 B, but this project should work for Raspberry Pi 3 B+.

### Optional sensors

#### Temperature and Humidity sensor

#### HDR Light Sensor

HDR light sensor can be purchased at https://www.amazon.com/gp/product/B00XW2OFWW

## Python: virtual environment, venv --> PIP needs its virutal environment to run; PyTest is a test environment for python

We tested two different light sensors. The Adafruit TSL-2591 requires a bit more setup, but gives more accurate light readings.

###Configuring the device:

- Connect a MicroSD card to your computer, and format it in FAT32 format (you can also buy a pre-loaded MicroSD cart with NOOBS pre-installed, and skip the next few steps).
- Download the NOOBS operating system from [The Raspberry Pi NOOBS download page](https://www.raspberrypi.org/downloads/noobs/)
- Once extracted, copied the archive folder's contents to the top level of the formatted SD card
- Eject the Micro SD card from your computer, and insert it in the slot on the Raspberry Pi
- Connect a display and keyboard to your Raspberry Pi, then connect the power cord.
- Allow the device to boot into Raspbian, and complete the prompts, making sure to set a non-default password for your user.
- Confirm the dialog asking you to update the Raspberry Pi's software.
- Install updated software when prompted (this will take some time).
- Open a Terminal from the Accessories sub-menu of the Raspberry menu.
- Type `sudo raspi-config` into the terminal, then navigate to `Network Options: Hostname`.
- Enter a new name that VNC Server will use to connect to the Pi.
- Navigate to `Interfacing Options`.
- Enable SSH.
- If you're using a photoresistor, enable SPI.
- If you're using an Adafruit TSL-2591, enable I2C.
- Restart the device (if you aren't prompted to do so, use `sudo reboot`).

### Using your Raspberry Pi from your computer

- In the Terminal on the Raspberry Pi, type `vncserver` and hit return.
- The command should respond with a number of details relating to the connection, including a VNC Server catchphrase which will help you ensure you're connecting to the right device, and a phrase "New desktop is `hostname:1` (where hostname is whatever you set earlier) followed by an ip address.
- On your computer, download and install VNC Client, and open the application.
- In the address bar of VNC viewer, type the `hostname:1` string that your raspberry pi responded with, and connect.
- You'll be prompted for your username and password, then you'll connect remotely to the device.

## How It Works

- user signs up
- verification happens (ensureUserAuth) to get the user to the page on the front end where the user can define the parameters of the pi data session
- user fills out form data for the session --> .post to the Heroku server (verify-session route) --> server sends back Token to the front end
- Token is sent from user front end computer to the raspberry pi directly via SSH command (shell command)
- Raspberry pi will use the token --> pulls info out of the token (id of session), verify that token was signed by our server --> uses this info to make the post to Heroku server via HTTP request (Python script)
- always a new token with every session!
