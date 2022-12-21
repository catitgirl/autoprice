const tariff = Array.from(document.querySelectorAll(".tariff"));
const option = Array.from(document.querySelectorAll(".option"));
const time = document.querySelector("#time");
const volume = document.querySelector("#volume");
const total = document.querySelector("#total");

const orderTariff = document.querySelector("#order_tariff");
const orderTime = document.querySelector("#order_time");
const orderOption = document.querySelector("#order_option");

tariff.forEach((el) => {
    el.addEventListener("click", tariffUpdate);
});

time.addEventListener("input", timeUpdate);

option.forEach((el) => {
    el.addEventListener("change", optionUpdate);
});

function tariffUpdate(e) {
    currentSet.tariff = e.target.id;
    updatePrice();
    orderUpdate();
}

function timeUpdate(e) {
    currentSet.time = time.value;
    volume.value = currentSet.time;
    updatePrice();
    orderUpdate();
}

function optionUpdate(e) {
    e.stopPropagation();
    if (e.target.checked) {
        currentSet.option.push(e.target.id);
    } else {
        let index = currentSet.option.indexOf(e.target.id);
        currentSet.option.splice(index, 1);
    }
    updatePrice();
    orderUpdate();
}

function updatePrice() {
    let tariffPrice = currentSet.getTariffPrice();
    let optionPrice = currentSet.getOptionPrice();
    let totalPrice = currentSet.time * tariffPrice + optionPrice;
    total.value = totalPrice;
}

function orderUpdate() {
    if (currentSet.time < 1) {
        orderTime.value = currentSet.time + " шарика";
    } else {
        orderTime.value = currentSet.time + " шариков";
    }
    orderTariff.value = currentSet.getTariffPrice() + " \u{20BD}";
    orderOption.value = currentSet.getOptionPrice() + " \u{20BD}";
}

const priceInfo = {
    tariff: {
        economy: 6400000,
        comfort: 6600000,
        business: 7000000,
    },
    option: {
        option1: 100000,
        option2: 5500,
        option3: 115000,
        option4: 50000,
    },
};

let currentSet = {
    tariff: "comfort",
    time: 0.5,
    option: [],
    getTariffPrice() {
        return priceInfo.tariff[this.tariff];
    },
    getOptionPrice() {
        let optionPrice = 0;
        if (!this.option.length == 0) {
            this.option.forEach((el) => {
                optionPrice += priceInfo.option[el];
            });
        }
        return optionPrice;
    },
};