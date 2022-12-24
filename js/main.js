const tariff = Array.from(document.querySelectorAll(".tariff"));
const option = Array.from(document.querySelectorAll(".option"));
const baloons = document.querySelector("#baloons");
const volume = document.querySelector("#volume");
const total = document.querySelector("#total");

const orderTariff = document.querySelector("#order_tariff");
const orderBaloons = document.querySelector("#order_baloons");
const orderOption = document.querySelector("#order_option");

tariff.forEach((el) => {
    el.addEventListener("click", tariffUpdate);
});

baloons.addEventListener("input", baloonsUpdate);

option.forEach((el) => {
    el.addEventListener("change", optionUpdate);
});

function tariffUpdate(e) {
    currentSet.tariff = e.target.id;
    updatePrice();
    orderUpdate();
}

function baloonsUpdate(e) {
    currentSet.baloons = baloons.value;
    volume.value = currentSet.baloons;
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
    let totalPrice = +currentSet.baloons + +tariffPrice + +optionPrice; // тут косяк в точ что склеивает как строки
    total.value = totalPrice;
}

function orderUpdate() {
    if (currentSet.baloons < 1) {
        orderBaloons.value = currentSet.baloons + " шарика";
    } else {
        orderBaloons.value = currentSet.baloons + " шариков";
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
    baloons: 0,
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

function showColor() {
    if (document.getElementById("color").value == "black")
        document.getElementById("carImage").src = "https://s3.us-east-2.amazonaws.com/dealer-inspire-vps-vehicle-images/11001971/SALYT2EX4MA303108/fe14cbe037ff19c0937f15f15f2b48eb.jpg";

    if (document.getElementById("color").value == "white")
        document.getElementById("carImage").src = "https://autonews-mag.com/images/image-1_1.jpg";

    if (document.getElementById("color").value == "silver")
        document.getElementById("carImage").src = "data:image/jpeg;base64,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";
}