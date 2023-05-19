# DimeWise (Budget/Finance Management)

This application was created to allow users (mostly myself) to track and improve their personal finances.

## Demo Login

Email: demo@demo.com

Password: DemoTest!!

### Link To Project: https://www.dimewise.dev/

![Project Screenshot](https://rt-media.s3.amazonaws.com/project-screenshots/dimewise.png)


## Tech Used: ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![REACT BADGE](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)![POSTGRESQL BADGE](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)![TAILWIND BADGE](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Optimizations
When creating this project, I decided to use a serveless database technology called Railway (https://railway.app/). The benefit of this service is it's ease of use and setup, but the problem is it's cold start times. I find that when opening the application for the first time in a while, it will take a good amount of time to load all of the information needed from the database. To fix this issue, I'd probably use my recent studies of AWS and use their RDS service, along with an EC2 instance, to create a low-latency environment for myself and the users of this application.

## Lessons Learned
Throughout my time as a developer, when dealing with querying from databases, I've mostly relied on the ORM I was using at the time (this time around it was Prisma). When dealing with a lot of the dashboard analytics, I had to use a lot of custom SQL queries that I was very uncomfortable with and needed assistance to create. This made me realize how important the knowledge of SQL querying actually is and how my neglect of raw SQL has hindered my growth as a full-stack engineer. Going forward I will spend more time studying and practicing this skill, so I can be more useful and knowledgable in regards to SQL.
