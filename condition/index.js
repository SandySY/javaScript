const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

const getDataStatus = (status) =>
  new Promise((resolve, reject) => {
    status ? resolve("done") : reject("fail");
  });

const getRes = async (data) => {
  try {
    const res = await getDataStatus(data);
    const timestamp = new Date().getTime();
    await delay(1000);
    console.log(res, new Date().getTime() - timestamp);
  } catch (error) {
    console.log(error);
  }
};

const intersection = (list, ...args) =>
  list.filter((item) => args.every((arg) => arg.includes(item)));

const dataType = (obj) =>
  Object.prototype.toString
    .call(obj)
    .replace(/^\[object (.+)\]/, "$1")
    .toLowerCase();
