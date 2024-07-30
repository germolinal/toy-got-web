I used this project to learn Flask, Python, Langchain and React.

* The back end is in Python
* Front end is in React (NextJS)


# Setup



```sh
############
# FRONT END
############

# go to directory
cd back 
# create virtual environment
python3 -m venv env  
# Activate environment
source env/bin/activate 
# install dependencies
pip3 install -r requirements.txt 
# go back to main directory
cd .. 
```

## Front End

```sh
############
# BACK END
############
# go to directory
cd front
# install dependencies
npm install
# go back to main directory
cd ..
```


## Run it.

> I generally open 2 terminal windows for this.

```sh
############
# BACK END
############
cd back
python3 main.py
cd .. # go back... optional
```

```sh
############
# FRONT END
############
cd front
npm run dev
cd .. # go back... optional
```