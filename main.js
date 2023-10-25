const url = "./quiz.json";
const appNode = document.querySelector('#app');
let answers;

async function fetchData(urlApi) {
  const response = await fetch(urlApi);
  const data = (await response.json());
  return data;
}

const showQuiz = async (urlApi) => {
  try {
    let i = 0;
    const questions = await fetchData(`${urlApi}`);
    answers = questions;
    const allItems = [];
    questions.forEach(item => {
      i++;
      /*
      <fieldset class="mb-2">
        <legend class="mt-2 mb-2 pt-0 fs-5">¿Que es esto?</legend>
        <div class="form-check">x3
          <input class="form-check-input" type="radio" name="01" id="01-0" value="0" checked>
          <label class="form-check-label" for="01-0">
            First radio
          </label>
        </div>
      </fieldset>
      */
      const options = [];
      item.options.forEach(op => {
        const input = document.createElement("input");
        input.className = "form-check-input";
        input.setAttribute("type", "radio");
        input.setAttribute("name", item.id);
        input.id = item.id + "-" + item.options.indexOf(op);
        input.setAttribute("value", item.options.indexOf(op));

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.setAttribute("for", item.id + "-" + item.options.indexOf(op));
        label.textContent = op;

        const inputLabel = document.createElement("div");
        inputLabel.className = "form-check";
        inputLabel.appendChild(input);
        inputLabel.appendChild(label);

        options.push(inputLabel);
      })

      const question = document.createElement("legend");
      question.className = "mt-2 mb-2 pt-0 fs-5";
      question.textContent = i + ". " + item.question;

      const container = document.createElement("fieldset");
      container.className = "mb-2";
      container.appendChild(question);
      container.append(...options);

      allItems.push(container);
    });
    appNode.append(...allItems);
    /*
    <div class="col-auto d-grid p-3">
      <button type="button" class="btn btn-primary" onclick="">Enviar</button>
    </div>
    */
    const btnVerify = document.createElement("button");
    btnVerify.className = "btn btn-primary";
    btnVerify.setAttribute("type", "button");
    btnVerify.setAttribute("onclick", "verify()");
    btnVerify.textContent = "Enviar";

    const btnDiv = document.createElement("div");
    btnDiv.className = "col-auto d-grid p-3";
    btnDiv.appendChild(btnVerify);

    appNode.appendChild(btnDiv);
  } catch (error) {
    const err = document.createElement("p");
    err.className = "text-center";
    err.textContent = "Error en la carga de elementos";
    appNode.append(err);
    console.error();
  }
}

showQuiz(url);

function verify() {
  answers.forEach(item => {
    const ans = document.createElement("p");
    ans.className = "text-center";
    ans.textContent = item.options[item.correct];
    appNode.append(ans);
  })
}
