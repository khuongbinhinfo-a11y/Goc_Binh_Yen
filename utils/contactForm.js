(() => {
  const endpoint = "https://script.google.com/macros/s/AKfycbysc5ICahR4FZ52E1SY4CRWGjLbS0on_1MQ8QUqKkFgfl4bVLlStZsF3WrFVO3Wk79n/exec";

  async function submitContactForm(payload) {
    const body = new FormData();
    body.append("full_name", payload.full_name || "");
    body.append("phone", payload.phone || "");
    body.append("email", payload.email || "");
    body.append("subject", payload.subject || "");
    body.append("message", payload.message || "");
    body.append("contact_type", payload.contact_type || "");
    body.append("page_url", payload.page_url || window.location.href);
    body.append("website", payload.website || "");

    const res = await fetch(endpoint, {
      method: "POST",
      body,
    });

    let data = null;
    try {
      data = await res.json();
    } catch (error) {
      data = null;
    }

    if (!res.ok) {
      return {
        ok: false,
        message: (data && data.message) || "Gửi thất bại, vui lòng thử lại.",
      };
    }

    if (data && typeof data.ok === "boolean") {
      return data;
    }

    return {
      ok: true,
      message: "Gửi thành công",
    };
  }

  window.submitContactForm = submitContactForm;
})();
