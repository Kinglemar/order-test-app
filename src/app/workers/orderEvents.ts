import axios from "axios";
const POLL_INTERVAL = 20000;
let pollId: NodeJS.Timeout | null = null;

export async function getOrders() {
  try {
    const response = await axios.get(
      "https://order-backend-3l4l.onrender.com/v1/parcels/get-test-orders?limit=20"
    );
    self.postMessage({
      type: "ORDERS-LIST",
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
    self.postMessage({
      type: "ERROR",
      payload: error,
    });
  }
}

self.onmessage = async (event) => {
  if (event.data.type === "START_POLLING") {
    await getOrders();
    pollId = setInterval(() => {
      getOrders();
    }, POLL_INTERVAL);
  }
};

self.addEventListener("error", (event) => {
  console.log(event.message);
  if (!pollId) return;
  clearInterval(pollId);
});
