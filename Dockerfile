# This image has python v3.7.7 and nodejs v12.6.3
FROM nikolaik/python-nodejs:python3.7-nodejs12 as base

# Env setup
ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.0.5 \
    WORKER_NUM=$WORKER_NUM

# Update and clean
RUN apt-get -y update \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

# Install poetry
RUN pip install "poetry==$POETRY_VERSION"

# Install server dependencies
WORKDIR /project
COPY poetry.lock pyproject.toml /project/

RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

# Creating folders, and files for a project:
COPY . /project

# Install client's dependencies
WORKDIR /project/client/
RUN npm install

# Give proper right to startup script
WORKDIR ../
RUN chmod +x prod.sh

# Expose needed ports
EXPOSE 8000

# Start up web-service
ENTRYPOINT ["./prod.sh"]

# Specified WORKER_NUM from env
CMD $WORKER_NUM
