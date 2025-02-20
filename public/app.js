const API_URL = "http://localhost:3010/api";

document.getElementById("create-wallet").addEventListener("click", async () => {
  const response = await fetch(`${API_URL}/wallet`, { method: "POST" });
  const wallet = await response.json();
  const walletsList = document.getElementById("wallets-list");
  walletsList.innerHTML += `
    <div>
        <p><strong>Address:</strong> ${wallet.address}</p>
        <p><strong>Public Key:</strong> ${wallet.publicKey}</p>
        <p><strong>Private Key:</strong> ${wallet.privateKey}</p>
    </div>
  `;
});

document.getElementById("get-wallet").addEventListener("click", async () => {
  const wallet = document.getElementById("wallet-address").value;
  const response = await fetch(`${API_URL}/wallet/${wallet}`);
  const result = await response.json();
  const status = document.getElementById("wallet-status");
  if (response.ok) {
    status.innerHTML = `
      <p style="color:green;">
          wallet ${JSON.stringify(result)}
      </p>
      `;
  } else {
    status.innerHTML = `
      <p style="color:red;">
          Error: ${result.error}
      </p>
      `;
  }
});

document.getElementById("fetch-blocks").addEventListener("click", async () => {
  const response = await fetch(`${API_URL}/blocks`);
  const blocks = await response.json();
  const blocksList = document.getElementById("blocks-list");
  blocksList.innerHTML = blocks.map(
    (block, index) => `
        <div>
            <h4>Block #${index}</h4>
            <pre>${JSON.stringify(block, null, 2)}</pre>
        </div>
    `
  );
});

document
  .getElementById("create-transaction")
  .addEventListener("click", async () => {
    const sender = document.getElementById("sender").value;
    const receiver = document.getElementById("receiver").value;
    const amount = document.getElementById("amount").value;

    const response = await fetch(`${API_URL}/transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, receiver, amount: Number(amount) }),
    });
    const result = await response.json();
    const status = document.getElementById("transactions-status");
    if (response.ok) {
      status.innerHTML = `
        <p style="color:green;">
            Transaction submitted success ${JSON.stringify(result)}
        </p>
        `;
    } else {
      status.innerHTML = `
        <p style="color:red;">
            Error: ${result.error}
        </p>
        `;
    }
  });

document.getElementById("get-pool").addEventListener("click", async () => {
  const response = await fetch(`${API_URL}/transactions`);
  const result = await response.json();
  const status = document.getElementById("pool-status");
  if (response.ok) {
    status.innerHTML = `
        <p style="color:green;">
            Pool ${JSON.stringify(result)}
        </p>
        `;
  } else {
    status.innerHTML = `
        <p style="color:red;">
            Error: ${result.error}
        </p>
        `;
  }
});

document.getElementById("create-mine").addEventListener("click", async () => {
  const miner = document.getElementById("miner").value;
  const response = await fetch(`${API_URL}/mine`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ minerAddress: miner }),
  });
  const result = await response.json();
  const status = document.getElementById("mine-status");
  if (response.ok) {
    status.innerHTML = `
      <p style="color:green;">
          Mine success ${JSON.stringify(result)}
      </p>
      `;
  } else {
    status.innerHTML = `
      <p style="color:red;">
          Error: ${result.error}
      </p>
      `;
  }
});

document.getElementById("get-balance").addEventListener("click", async () => {
  const address = document.getElementById("address").value;
  const response = await fetch(`${API_URL}/balance/${address}`);
  const result = await response.json();
  const status = document.getElementById("balance-status");
  if (response.ok) {
    status.innerHTML = `
      <p style="color:green;">
          Balance ${JSON.stringify(result)}
      </p>
      `;
  } else {
    status.innerHTML = `
      <p style="color:red;">
          Error: ${result.error}
      </p>
      `;
  }
});

document.getElementById("get-block").addEventListener("click", async () => {
  const block = document.getElementById("block-number").value;
  const response = await fetch(`${API_URL}/blocks/${block}`);
  const result = await response.json();
  const status = document.getElementById("block-status");
  if (response.ok) {
    status.innerHTML = `
      <p style="color:green;">
          Block ${JSON.stringify(result)}
      </p>
      `;
  } else {
    status.innerHTML = `
      <p style="color:red;">
          Error: ${result.error}
      </p>
      `;
  }
});
