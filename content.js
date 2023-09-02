const DELAY = 350;

const reset_css = () => {
  document
    .querySelectorAll('style,link[rel="stylesheet"]')
    .forEach(
      (item) =>
        item.href === "https://myeducation.gov.bc.ca/aspen/css/student.css" &&
        item.remove()
    );

  const elements = document.querySelectorAll("*");

  elements.forEach((element) => {
    element.classList.remove("c1Background");
    element.classList.remove("navTabBackground");
  });
};

const add_font = () => {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css?family=Inter";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

const change_title = () => {
  const title_elem = document.getElementsByClassName("reset_style_h1_top")[0];
  if (!title_elem) return;
  title_elem.textContent = "Better MyEd Dashboard";
};

const change_text = () => {
  const widget_element = document.querySelector("#widgetsContainer");
  if (!widget_element) return;
  widget_element.textContent = "";
  text = "Honestly, no one uses this page :)";
  drawn = "";
  setTimeout(() => {
    const interval = setInterval(() => {
      if (drawn.length < text.length) {
        drawn += text[drawn.length];
        widget_element.innerHTML = drawn;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }, DELAY);
};

const fadeout_overlay = () => {
  setTimeout(function () {
    document.getElementById("overlay").classList.add("fade-out");
    document.getElementById("spinner").classList.add("fade-out");
  }, DELAY);
};

const delete_copyright = () => {
  const footer = document.getElementsByClassName("toolbarText")[0];
  if (!footer) return;
  footer.remove();
};

const fix_login = () => {
  const login_form = document.getElementById("logonDetailContainer");
  if (!login_form) return;
  const table = login_form.children[0].children[0];
  for (let i = 9; i > 4; i--) {
    try {
      table.children[i].remove();
    } catch (e) {}
  }
  const login_button = table.children[4].children[0];
  login_button.classList.remove("logonTopPadding");
};

const start = () => {
  reset_css();
  add_font();
  change_title();
  change_text();
  update_login_image();
  delete_copyright();
  fix_login();
  fadeout_overlay();
};

const update_login_image = () => {
  const light_title = document.getElementsByClassName("lightTitle")[0];
  if (!light_title) return;
  light_title.removeChild(light_title.children[0]);
  const div = document.createElement("div");
  div.textContent = "Welcome to the Better MyEdBC Dashboard!";
  light_title.appendChild(div);
};

var observer = new MutationObserver(function (mutations) {
  mutations.find(function (mutation) {
    for (let nodes of mutation.addedNodes) {
      if (nodes.nodeName === "BODY") {
        const overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.classList.add("bodyBackground");
        const spinner_wrapper = document.createElement("div");
        spinner_wrapper.id = "spinner-wrapper";
        overlay.appendChild(spinner_wrapper);
        const spinner = document.createElement("div");
        spinner.id = "spinner";
        spinner_wrapper.appendChild(spinner);
        nodes.insertBefore(overlay, nodes.firstChild);
        observer.disconnect();
        return true; // Early termination of find()
      }
    }
  });
});

observer.observe(document.documentElement, { childList: true });

window.addEventListener("load", start);
