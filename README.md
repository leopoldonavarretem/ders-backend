<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<!--suppress ALL -->
<br />
<div align="center">

<h3 align="center">DERS</h3>

  <p align="center">
    DERS (Dynamo Express Reimbursement System) is an HTTP based reimbursement system. This project was developed while at training with Revature.
    <br />
    <a href="https://github.com/leopoldonavarretem/ders-backend"><strong>Explore the docs »</strong></a>
    <br />
</p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->

## About The Project

DERS is a backend system for a reimbursement system. Employees are able to create and sign-in to their accounts, submit
and view previous tickets. Managers are allowed to see a queue of submitted tickets and either approve or deny them. All
routes are protected by employee role and sign in status. The system features a complete input validation system and
status code responses.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![DynamoDB][DynamoDb]][DynamoDB-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

* Node project manager
* An AWS account and IAM user.

### Installation

1. Clone the repo
   ```
   git clone https://github.com/leopoldonavarretem/ders-backend.git
   ```
2. Install NPM packages
   ```
   npm install
   ```
3. Enter the following variables in to your environment.
   ```
   PORT= //The port number that your app will connect to.
   TICKETSTABLE= //The name of the DynamoDB table where tickets will be stored.
   USERSTABLE = //The name of the DynamoDB table where users will be stored.
   JWTSECRET = //The secret that JWT will sign its tokens.
   AMAZONREGION = //The region where your DynamoDB tables are stored.
   AWS_ACCESS_KEY_ID = //The DynamoDb access key ID.
   AWS_SECRET_ACCESS_KEY = //The DynamoDB access key secret.
   AWS_DEFAULT_REGION = //The region where your DynamoDB tables are stored.
   ```
4. Run server.js
   ```
   node server.js
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->

## Contact

Project Link: [https://github.com/leopoldonavarretem/ders-backend](https://github.com/leopoldonavarretem/ders-backend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

* [Revature](https://revature.com/)
* My trainers Bach T. and Brian A.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/leopoldonavarretem/ders-backend.svg?style=for-the-badge

[contributors-url]: https://github.com/leopoldonavarretem/ders-backend/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/leopoldonavarretem/ders-backend.svg?style=for-the-badge

[forks-url]: https://github.com/leopoldonavarretem/ders-backend/network/members

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/leopoldonavarretem

[Express.js]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express&logoColor=000000

[Express-url]: https://expressjs.com/

[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=000000

[Node-url]: https://nodejs.org

[DynamoDb]: https://img.shields.io/badge/DynamoDB-4053D6?style=for-the-badge&logo=AmazonDynamoDB&logoColor=000000

[DynamoDB-url]: https://aws.amazon.com/dynamodb/