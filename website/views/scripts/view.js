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

    activateForm(formElement) {
        const currentActiveForm = document.querySelector('.active-form');
        if (currentActiveForm) {
            // None of form is currently activated yet.
            currentActiveForm.classList.remove('active-form');
        }
        formElement.classList.add('active-form');
    }

    handleAddChapterAction() {
        const run = this;
        this.addChapterBtn.onclick = function() {
            const addChapterForm = document.querySelector('.add-chapter-form');
            run.activateForm(addChapterForm);
        }
    }

    handleSubmitFormAction() {
        this.formElements.forEach(formElement => {
            formElement.addEventListener('submit', (event) => {
                event.preventDefault();
                const inputElements = formElement.querySelectorAll("input");

                const formType = formElement.classList[0];

                let submitInfo = {
                    "value": {},
                    "type": formType
                };
            
                inputElements.forEach(inputElement => {
                    submitInfo["value"][inputElement.name] = inputElement.value;
                })

                console.log(submitInfo);
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