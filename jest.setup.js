import "@testing-library/jest-dom";

class MockWorker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = () => {};
  }

  postMessage(msg) {
    setTimeout(() => {
      this.onmessage({
        data: {
          type: "USERS_FETCHED",
          data: [
            { name: "Mock User", email: "mock@test.com", customerId: "789" },
          ],
        },
      });
    }, 100);
  }

  terminate() {}
}

global.Worker = MockWorker;
