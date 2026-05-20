import type { Item } from "types";
import { send } from "clientUtilities";
import { create } from "componentUtilities";

let itemInput = document.querySelector<HTMLInputElement>("#itemInput")!;
let amountInput = document.querySelector<HTMLInputElement>("#amountInput")!;
let addButton = document.querySelector<HTMLButtonElement>("#addButton")!;
let itemsUl = document.querySelector<HTMLUListElement>("#itemsUl")!;

let items = await send<Item[]>("getItems");

for (let i = 0; i < items.length; i++) {
  let itemLi = create("li");
  itemLi.innerText = `${items[i].amount} ${items[i].name}`;
  itemsUl.append(itemLi);
}

addButton.onclick = async function () {
  await send("addItem", itemInput.value, parseInt(amountInput.value));
  location.reload();
};
