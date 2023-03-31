class Run {
    lessonListSection;
    knowledgeSection;
    relatedKnowledgeSection;
    addChapterBtn;
    formElements;

    constructor() {
        this.lessonListSection = document.querySelector(".lesson-list-section");
        this.knowledgeSection = document.querySelector(".knowledge-section");
        this.relatedKnowledgeSection = document.querySelector(".related-knowledge-section");
        this.addChapterBtn = document.querySelector(".add-chapter-btn");
        this.formElements = document.querySelectorAll("form");
    }

    httpGet(url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    activateForm(formElement) {
        const currentActiveForm = document.querySelector('.active-form');
        if (currentActiveForm) {
            currentActiveForm.classList.remove('active-form');
        }
        formElement.classList.add('active-form');
    }

    generateUrl(baseUrl, inputValues) {
        let url = baseUrl;
        for (let key of Object.keys(inputValues)) {
            url += key + '=' + inputValues[key] + '&';
        }
        return url.substring(0, url.length - 1);
    }

    handleAddChapterAction() {
        const run = this;
        this.addChapterBtn.onclick = function() {
            const addChapterForm = document.querySelector('.add-chapter-form');
            run.activateForm(addChapterForm);
        }
    }

    handleSubmitFormAction() {
        const run = this;
        this.formElements.forEach(formElement => {
            formElement.addEventListener('submit', (event) => {
                event.preventDefault();
                const inputElements = formElement.querySelectorAll("input");

                const formType = formElement.classList[0];

                let submitInfo = {
                    "values": {},
                    "type": formType
                };
            
                inputElements.forEach(inputElement => {
                    submitInfo["values"][inputElement.name] = inputElement.value;
                })
                const baseUrl = "http://localhost:8081/add-chapter?";
                let url = run.generateUrl(baseUrl, submitInfo['values']);
                console.log(url);
                const addChapterStatus = run.httpGet(url);

                console.log(submitInfo);
                console.log(addChapterStatus);
            })
        })
    }

    handleActivateForms() {
        this.handleAddChapterAction();
    }
    handleSubmitForms() {
        this.handleSubmitFormAction();
    }

    run() {
        this.handleActivateForms();
        this.handleSubmitForms();
    }
}

const run = new Run();
run.run();