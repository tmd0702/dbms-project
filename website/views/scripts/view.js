class Run {
    lessonListSection;
    knowledgeSection;
    relatedKnowledgeSection;
    addChapterBtn;
    formElements;
    chapterListSection;
    formExitBtn;
    serverRoute;
    addKnowledgeLessonId;
    addLessonChapterId;
    addKnowledgeBtn;
    constructor() {
        this.serverRoute = {

        }
        this.addKnowledgeBtn = document.querySelector(".add-knowledge-btn");
        this.lessonListSection = document.querySelector(".lesson-list-section");
        this.knowledgeSection = document.querySelector(".knowledge-section");
        this.relatedKnowledgeSection = document.querySelector(".related-knowledge-section");
        this.addChapterBtn = document.querySelector(".add-chapter-btn");
        this.formElements = document.querySelectorAll("form");
        this.chapterTitleSection = document.querySelector(".chapter-title-section");
        this.formExitBtns = document.querySelectorAll(".exit-btn");
    }
    handleDeleteBtnAction(deleteBtn) {
        let chapterId, url, lessonId;
        if (deleteBtn.classList[0] == 'delete-chapter') {
            chapterId = deleteBtn.parentNode.parentNode.id;
            url = `http://localhost:8081/delete-chapter?chapter_id=${chapterId}`;
            let st = this.httpGet(url)
            document.getElementById(chapterId).remove();
            console.log(st)

        } else if (deleteBtn.classList[0] == 'delete-lesson') {
            lessonId = deleteBtn.parentNode.parentNode.id;
            url = `http://localhost:8081/delete-lesson?lesson_id=${lessonId}`;
            let st = this.httpGet(url)
            document.getElementById(lessonId).remove();
            console.log(st)
        } else if (deleteBtn.classList[0] == 'delete-knowledge') {

        }
    }
    renderInterface() {
        const run = this;
        const chapterList = JSON.parse(this.httpGet('http://localhost:8081/chapter-list'));
        console.log(chapterList);
        chapterList.forEach(chapter => {
            const chapterId = chapter['ID'];
            const chapterTitle = chapter['TITLE'];
            const chapterTitleElement = document.createElement('div');
            chapterTitleElement.setAttribute('id', chapterId);
            // chapterTitleElement.textContent = chapterTitle;
            const deleteBtnSection = document.createElement('div');
            deleteBtnSection.classList.add('delete-btn-section');
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-chapter');
            deleteBtnSection.appendChild(deleteBtn);
            chapterTitleElement.appendChild(deleteBtnSection);

            deleteBtn.onclick = function() {
                run.handleDeleteBtnAction(deleteBtn);
            }

            const titleText = document.createElement('h3');
            titleText.classList.add('title-text');
            titleText.textContent = chapterTitle;
            chapterTitleElement.appendChild(titleText);
            chapterTitleElement.classList.add('chapter-title');
            this.chapterTitleSection.appendChild(chapterTitleElement);
            const fetchLessonUrl = `http://localhost:8081/chapter-lesson-list?chapter_id=${chapterId}`;
            const lessonList = JSON.parse(this.httpGet(fetchLessonUrl));
            const lessonTitleSection = document.createElement('div');
            lessonTitleSection.classList.add('lesson-title-section');
            
            chapterTitleElement.appendChild(lessonTitleSection);

            for (let index = 0; index < lessonList.length; ++index) { 
                
                const lesson = lessonList[index];
                const lessonId = lesson['ID'];
                const lessonTitle = lesson['TITLE'];
                const lessonTitleElement = document.createElement('div');
                lessonTitleElement.classList.add('lesson-title');
                lessonTitleElement.setAttribute('id', lessonId);

                const lessonDeleteBtnSection = document.createElement('div');
                lessonDeleteBtnSection.classList.add('delete-btn-section');
                const deleteLessonBtn = document.createElement('button');
                deleteLessonBtn.classList.add('delete-lesson');
                lessonDeleteBtnSection.appendChild(deleteLessonBtn);
                lessonTitleElement.appendChild(lessonDeleteBtnSection);
                
                const lessonTitleText = document.createElement('h4');
                lessonTitleText.textContent = lessonTitle;

                lessonTitleElement.appendChild(lessonTitleText);
                // lessonTitleElement.textContent = lessonTitle; 
                lessonTitleSection.appendChild(lessonTitleElement);

                deleteLessonBtn.onclick = function() {
                    run.handleDeleteBtnAction(deleteLessonBtn);
                }
            }
            const addLessonBtn = document.createElement('div');
            addLessonBtn.classList.add('add-lesson-btn');
            addLessonBtn.textContent = 'Add lesson';
            lessonTitleSection.appendChild(addLessonBtn);

        })
    }
    handleDisplayLessonlist() {
        const chapterTitleElements = document.querySelectorAll('.title-text');
        console.log(chapterTitleElements)
        chapterTitleElements.forEach(chapterTitle => {
            chapterTitle.onclick = function() {
                const lessonTitleSection = chapterTitle.parentElement.querySelector('.lesson-title-section');
                if (lessonTitleSection.classList.contains('active-lesson-list')) {
                    lessonTitleSection.classList.remove('active-lesson-list');
                } else {
                    lessonTitleSection.classList.add('active-lesson-list');
                }
            }
        })
    }
    httpGet(url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    activateForm(formElement) {
        formElement.classList.add('active-form');
    }
    deactivateForm() {
        const currentActiveForm = document.querySelector('.active-form');
        if (currentActiveForm) {
            currentActiveForm.classList.remove('active-form');
        }
    }

    generateUrl(baseUrl, inputValues) {
        let url = baseUrl;
        for (let key of Object.keys(inputValues)) {
            url += key + '=' + inputValues[key] + '&';
        }
        return url.substring(0, url.length - 1);
    }
    handleAddLessonAction() {
        const run = this;
        const chapterTitleElements = document.querySelectorAll('.chapter-title');
        console.log(chapterTitleElements);
        chapterTitleElements.forEach(chapterTitle => {
            const addLessonBtn = chapterTitle.querySelector(".add-lesson-btn");
            if (addLessonBtn) {
                addLessonBtn.onclick = function() {
                    const chapterId = addLessonBtn.parentNode.parentNode.id;
                    const addLessonForm = document.querySelector('.add-lesson-form');
                    addLessonForm.querySelector('form')['chapter-id'] = chapterId;
                    run.activateForm(addLessonForm);
                }

            }
        })
        
    }
    handleExitFormAction() {
        const run = this;
        console.log(this.formExitBtns);
        this.formExitBtns.forEach(formExitBtn => {
            formExitBtn.onclick = function() {
                run.deactivateForm();
            }
        })
    }
    handleAddChapterAction() {
        const run = this;
        this.addChapterBtn.onclick = function() {
            const addChapterForm = document.querySelector('.add-chapter-form');
            run.activateForm(addChapterForm);
        }
    }

    handleAddKnowledgeAction() {
        const run = this;
        this.addKnowledgeBtn.onclick = function() {
            const addKnowledgeForm = document.querySelector('.add-knowledge-form');
            run.activateForm(addKnowledgeForm);
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
                if (formType === 'add-lesson') {
                    console.log(formElement, 'ffdfdfdf');
                    submitInfo["values"]["chapter_id"] = formElement["chapter-id"];
                }
                inputElements.forEach(inputElement => {
                    submitInfo["values"][inputElement.name] = inputElement.value;
                })

                const baseUrl = `http://localhost:8081/${formType}?`;
                let url = run.generateUrl(baseUrl, submitInfo['values']);
                console.log(url);
                const status = run.httpGet(url);

                console.log(submitInfo);
                console.log(status);
                run.deactivateForm();
                // run.renderInterface();
            })
        })
    }

    handleActivateForms() {
        this.handleAddChapterAction();
        this.handleAddLessonAction();
        this.handleAddKnowledgeAction();
    }
    handleSubmitForms() {
        this.handleSubmitFormAction();
    }

    run() {
        this.renderInterface();
        this.handleActivateForms();
        this.handleSubmitForms();
        this.handleDisplayLessonlist();
        this.handleExitFormAction();
    }
}

const run = new Run();
run.run();