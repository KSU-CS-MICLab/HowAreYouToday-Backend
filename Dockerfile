# alpine 버전은 node.js 공식 이미지보다 몇 배나 가볍습니다.
# 6xx mb vs 13x mb
FROM node:8.11-alpine
MAINTAINER Seunguk Lee <lsy931106@gmail.com>

# nodemon 설치
RUN yarn global add nodemon

# 현재 프로젝트 디렉토리의 package.json이 컨테이너의 tmp 폴더 아래에 복사됩니다.
COPY ./package.json /tmp/package.json

# 필요한 모듈을 인스톨해줍니다.
RUN cd /tmp && yarn install

# 프로젝트 코드가 위치할 app 폴더를 만들고 node_modules를 복사해줍니다.
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

# WORKDIR은 경로를 설정한 경로로 고정시켜줌.
# Dockerfile의 모든 명령어는 기본적으로 /(루트) 디렉토리에서 실행되므로 상당히 유용하게 쓸 수 있음.
WORKDIR /usr/src/app

# package.json을 프로젝트 디렉토리로 복사
COPY ./package.json /usr/src/app

# 이제 src 폴더 아래의 코드를 복사
COPY ./src/ /usr/src/app/

# CMD는 명령어를 배열 형태로 배치해야하며
# 실제로 앱을 실행시키는 커맨드가 들어간다.
CMD ["yarn", "start"]