FROM ubuntu:18.04

WORKDIR /mydir

RUN apt-get update
RUN apt-get install -y curl python
RUN curl -L https://github.com/ytdl-org/youtube-dl/releases/download/2021.12.17/youtube-dl -o /usr/local/bin/youtube-dl
RUN chmod a+x /usr/local/bin/youtube-dl

ENV LC_ALL=C.UTF-8

ENTRYPOINT ["/usr/local/bin/youtube-dl"]
