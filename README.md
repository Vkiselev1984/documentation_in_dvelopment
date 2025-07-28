# Documentation

# Contents

- [Documentation approaches](##DOCUMENTATION-APPROACHES)
- [Criteria for good documentation](##CRITERIA-FOR-GOOD-DOCUMENTATION)
- [Main types of documentation](##MAIN-TYPES-OF-DOCUMENTATION)
- [Text documentation description of the software operation algorithm](##TEXT-DOCUMENTATION-DESCRIPTION-OF-THE-SOFTWARE-OPERATION-ALGORITHM)
- [User scenarios Use Case](##USER-SCENARIOS-USE-CASE)
- [Api documentation](##API-DOCUMENTATION)
- [Business Process Diagram and BPMN Notation](BUSINESS-PROCESS-DIAGRAM-AND-BPMN-NOTATION)
- [UML notation sequence diagram](UML-NOTATION-SEQUENCE-DIAGRAM)
- [Data Models and ER Diagram](DATA-MODELS-AND-ER-DIAGRAM)

## DOCUMENTATION APPROACHES

Documentation is a document that clearly and accurately describes the logic of the operation of a software function or set of functions in text and/or graphical representation.

A documentation culture is an integral part of any software development organization. Effective documentation helps users understand how to use the system and helps developers improve and maintain it.

Documentation should be accurate, complete, and up-to-date so that users can easily find the information they need. In addition, documentation should be written in clear language and contain examples so that
users can quickly master new features.

Approaches are distinguished both within the two most popular development frameworks: Waterfall and Agile, and from the point of view of the approach to development: iterative, incremental, flexible.

![waterfall](./img/waterfall.png) ![agile](./img/agail.png)

Documentation creation in Waterfall and Agile differs in the following major aspects:

- Timeframe: In Waterfall, documentation is created and completed at each stage before moving on to the next. All documents are developed and approved in advance, which usually happens at the beginning of the project.

  In Agile, documentation is developed as needed and can be changed or supplemented during development.

- **Level of detail**: In Waterfall, documentation typically represents detailed and extensive documents, such as technical specifications, architectural diagrams, and project plans.

  In Agile, documentation can be more flexible and elastic, including requirements summaries, notes, and progress reports.

- **Scope**: In Waterfall, documentation is used extensively to communicate information between project participants and stakeholders.

  In Agile, documentation can be more focused on communication within the development team to ensure alignment and understanding of tasks.

- **Flexible and changeable**: Waterfall assumes that documentation should be tightly bound to the project and changes require a formal change to the project plan.

  In Agile, documentation can be more flexible and can change as needed to reflect new requirements or changing priorities.

If we talk about "**Waterfall**" - it is assumed that all the requirements are known to us initially, and it is also assumed that they cannot change. In this case, we can write documentation before the development process begins
and accept the technical task as a basis for writing documentation.

In reality, this almost never happens, both in large and small organizations. If we talk about large organizations - then the main factor of the unknown is other systems with which you will need integrations. In small organizations, on the contrary, since the architectural landscape is not yet so rich, no one knows, even with precise planning, what will happen as a result of development.

Thus, in order to avoid doing the same work several times, at the initial stage of development or before its start, it is better for the system analyst to focus on designing the technical solution, and only when it begins to become clear which path you are taking, you can begin to begin documenting, but you must always be aware that the software logic may change until the very end of the development. Therefore, after the fact, you once again check with the development team for the correctness of the logic described in the documentation.

If we take **Agile**, iterative or incremental approaches as an example, then changing the requirement is almost the main paradigm. But if we write documentation, it is important for us to understand the following nuances: whether the increment developed within the sprint is independent functionality or software, how future or past increments will affect the logic of its work. That is, we need to understand the boundaries of this or that
software that is developed within one iteration.

Let me give you an example: for example, your development team develops one microservice in one sprint. A microservice is a separate entity, it is logical that the microservice needs documentation describing its operation.

Another case, you are doing a large project for a quarter or six months, as part of planning you broke it down into short iterations, within which in one sprint you develop a piece of one microservice, a piece of another
microservice, set up a message broker, roll out a new database, etc.

It is clear that in this case, within each iteration, it will be difficult for you to document the developed functionality. In this case, within one sprint, plan to create documentation for a separate component and describe it in parallel with the development, or plan time after the end of the development stage for creating documentation.

## CRITERIA FOR GOOD DOCUMENTATION

### Unambiguity

Unambiguity means that in the document we must unambiguously understand the logic of the operation of a particular software scenario. We should not have any misunderstandings about how the system will behave in a particular case: it may be one way, or another, this should not be. The documentation must clearly describe the scenario, trigger, and behavior of the system.

### Accuracy

This criterion partially follows from the previous one. By accuracy we mean that the document must be described in the most precise way. Based on the depth of detail, the document must clearly and accurately describe the logic of the functions.

### Relevance

Documentation should be relevant to the code, relevant to the working functions in the production environment. All relevant functions should be described.

Non-working functions should be marked as decommissioned. It is also important to update the documentation when new functions are added to the code.

### Unification

Documentation should be described in the accepted format for a particular type of functionality. If your company has adopted a single documentation standard for microservices, then the document should be made according to a single template.

### Referentiality

By this criterion, I mean such a property within which the documentation can be referenced in other documents or types of documentation and within the framework of the documentation being developed, I can refer to other documents or types of documentation. Thus, each individual documentation is a part, so to speak, of the documentation ecosystem in the organization. If documentation cannot be used in other documents, it can
lead to duplication of work and confusion. Therefore, it is important that documentation is well structured and easily accessible for use in other documents.

### Validability

Documentation must be checked for accuracy and completeness before publication. This ensures that the documentation contains all required information about the software and does not contain errors in the logic of the functions. Documentation reviews can be carried out by other analysts who work on similar projects, as well as developers and leads.

## MAIN TYPES OF DOCUMENTATION

### Project documentation

Complete documentation for the technical solution. Includes the architecture of the solution, which describes all the necessary components, business process diagrams, sequences, etc. In other words, this is a set of documents containing the most detailed and accurate information about the project.

The depth of such documentation should be as detailed as possible, i.e. such documentation should describe the logic of each component, if we reuse existing components, we must provide a link to them.

### Front-end documentation

Documentation describing the client part of the functionality, in other words, screens available to the user, and, as a rule, describes what functions and causes pressing a particular button, or going to a particular screen.

### Backend documentation

Documentation describing the main logic of work "under the hood": microservices or a monolithic system, message brokers, buses, and so on.

### Storage Documentation

Documentation describing the storage structure of data used by the software.

## TEXT DOCUMENTATION DESCRIPTION OF THE SOFTWARE OPERATION ALGORITHM

Text documentation, as a rule, we encounter when we want to study the logic of the legacy, monolith or simply old functionality, such software can be found in almost any organization. This type of documentation does not have any specific writing rules, in addition to the general principles that we discussed above. Despite the lack of a specific format (as a rule, each organization has its own), such documentation describes the algorithms of the service in as much detail as possible and meets all the necessary criteria for good documentation. Documentation of this type may look something like this:

1. User ID

The system finds the user ID in the Users table in the **Users.Id field**.

2. User type

The system determines the user type using the value in the UserTypes table in the UserTypes.Name field by the value key of the **Users.Type_Id = UserTypes.Id fields**.

3. User order history

The system finds the user's order history in the Orders table in the Orders.Id field by the value key of the **Users.Type_Id = Orders.User_Id fields**.

4. Detailed order information

Detailed order information is collected from the **select \* from Orders where id = “1234” user_id = “5678” query**.

5. New order

A new order is created in the Orders table, and a unique identification number is assigned to the
**Orders.Id** field. The **Orders.Status** field is set to “new”.

6. Payment for the order

After the user pays for the order, the value of the **Orders.Status** field changes from “new” to “confirmed”

## USER SCENARIOS USE CASE

According to Alistair Colbairn, use cases are scenarios that demonstrate how users interact with a system.
Use cases help to define system requirements and test its functionality.

Colbairn suggests four types of use cases:

- Primary Use Case - this is the main scenario of the system's operation, which shows how the system solves the user's main task.
- Secondary Use Case - this is a scenario that extends the primary use case and shows additional features of the system.
- Alternative Use Case - this use case shows how the user can use the system to solve a task other than the primary task.
- Exceptional Use Case - this type of use case shows how the system should respond to exceptional situations, such as data entry errors or system failures.

### Use Case

Checking student homework by reviewer and entering results

#### Scope:

- system for completing and checking homework

#### Participants and Interests:

- Student - wants to get a grade and feedback on homework
- Reviewer - wants to give the highest quality and detailed feedback on student homework

#### Trigger:

- student completes homework and sends it to reviewer for checking

Basic scenario:

1. The student submits the completed homework for checking
2. The system assigns a free reviewer to check the homework
3. The reviewer receives a notification about receiving a new homework for checking.
4. The reviewer confirms his/her assignment to the system and starts checking the homework.
5. The student receives a notification that a reviewer has started checking his/her homework and notifies which of the reviewers is checking it.
6. The reviewer checks all the tasks, assigns a score to each task and leaves a comment.
7. The student receives scores and feedback on each task.

Extensions:

2.. There are no available reviewers.

    a. The system notifies the student that the time for checking the homework will be increased due to the lack of currently available reviewers

    b. After a certain amount of time (configurable parameter), the system assigns a free reviewer to check the homework.

6.. In the process of checking the assignment, the reviewer finds out that the student has not fully completed the assignment.

    a. The reviewer marks the homework as not fully completed and sends the assignment for revision

    b. The student receives a notification that his homework has been returned with the status “For revision”

    c. The student revises the homework and sends it for review

7.. The student believes that the assessment and feedback on his homework are incorrect.

    a. The student selects the “appeal” option, gives additional comments on his assignment

    b. The system assigns a free reviewer, different from the reviewer who checked the assignment the first time, to check the homework.

    c. Then the script process continues from step 3 of the main process

## API DOCUMENTATION

Documentation for API services can be presented in different forms as Swagger or Postman.

In this example, we will consider an example of documentation for a microservice of an educational portal that allows a reviewer to check the work of students.

```
URL (resource): http://[host]/review/api/
GET http://[host]/review/api/tasks // get all tasks for review
```

**Input data**:

| Field       | Type   | Description |
| ----------- | ------ | ----------- |
| reviewer_id | string | Reviewer ID |

**Output data**:

| Field               | Type    | Description                                 |
| ------------------- | ------- | ------------------------------------------- |
| tasks               | array   | List of homework assignments to be reviewed |
| tasks[].id          | string  | ID of the assignment to be reviewed         |
| tasks[].homework_id | string  | ID of the homework assignment               |
| tasks[].student_id  | string  | ID of the student                           |
| tasks[].course_id   | string  | ID of the course                            |
| tasks[].reviewer_id | string  | ID of the reviewer                          |
| tasks[].status      | integer | Status of the assignment                    |
| tasks[].result      | integer | Result of the assessment                    |
| tasks[].feedback    | string  | Feedback from the reviewer                  |

```
GET http://[host]/review/api/tasks/[task_id] // get a specific task for checking
```

**Input data**:

| Field       | Type   | Description |
| ----------- | ------ | ----------- |
| reviewer_id | string | Reviewer ID |
| task_id     | string | Task ID     |

**Output data**:

| Field       | Type    | Description            |
| ----------- | ------- | ---------------------- |
| id          | string  | Task ID to be reviewed |
| homework_id | string  | Homework ID            |
| student_id  | string  | Student ID             |
| course_id   | string  | Course ID              |
| reviewer_id | string  | Reviewer ID            |
| status      | integer | Task status            |
| result      | integer | Assessment result      |
| feedback    | string  | Reviewer feedback      |

```
PATCH http://[host]/review/api/tasks/[task_id] // sending assessment and feedback on
homework
```

**Input data**:

| Field       | Type    | Description        |
| ----------- | ------- | ------------------ |
| reviewer_id | string  | Reviewer ID        |
| task_id     | string  | Task ID for review |
| status      | integer | Task status        |
| result      | integer | Evaluation result  |
| feedback    | string  | Reviewer feedback  |

**Output data**:

| Field       | Type    | Description            |
| ----------- | ------- | ---------------------- |
| task_id     | string  | Task ID to be reviewed |
| homework_id | string  | Homework ID            |
| student_id  | string  | Student ID             |
| course_id   | string  | Course ID              |
| reviewer_id | string  | Reviewer ID            |
| status      | integer | Task status            |
| result      | integer | Assessment result      |
| feedback    | string  | Reviewer feedback      |

```
GET http://[host]/review/api/students // get a list of students
```

**Input data**:

| Field       | Type   | Description |
| ----------- | ------ | ----------- |
| reviewer_id | string | Reviewer ID |

**Output data**:

| Field                  | Type   | Description                           |
| ---------------------- | ------ | ------------------------------------- |
| students               | array  | List of homework assignments to check |
| students[].student_id  | string | Student ID                            |
| students[].course_id   | string | Course ID                             |
| students[].reviewer_id | string | Reviewer ID                           |

```
GET http://[host]/review/api/students/[student_id] // get a list of homework
assignments for a specific student
```

**Input data**:

| Field       | Type   | Description |
| ----------- | ------ | ----------- |
| reviewer_id | string | Reviewer ID |

**Output data**:

| Field               | Type    | Description                                 |
| ------------------- | ------- | ------------------------------------------- |
| student_id          | string  | Student ID                                  |
| course_id           | string  | Course ID                                   |
| reviewer_id         | string  | Reviewer ID                                 |
| tasks               | array   | List of homework assignments to be reviewed |
| tasks[].id          | string  | ID of the assignment to be reviewed         |
| tasks[].homework_id | string  | ID of the homework assignment               |
| tasks[].student_id  | string  | Student ID                                  |
| tasks[].course_id   | string  | Course ID                                   |
| tasks[].reviewer_id | string  | Reviewer ID                                 |
| tasks[].status      | integer | Status of the assignment                    |
| tasks[].result      | integer | Assessment result                           |
| tasks[].feedback    | string  | Feedback from the reviewer                  |

## BUSINESS PROCESS DIAGRAM AND BPMN NOTATION

A business process diagram is a visual representation of the sequence of actions performed within a business process. It is needed to understand what actions are performed, in what sequence, who is responsible for performing each action and what results are expected at the output. A business process diagram helps to analyze and optimize the company's work, identify problem areas and improve work efficiency.

In other words, it is an artifact that describes the work of a particular business process of the functionality being developed. As a rule, BPMN 2.0 notation is used to create such
diagrams.

BPMN 2.0 notation includes the following elements:

- Event is a point in a process where something happens or can happen. Events can be triggers, such as the start or end of a process, or they can be the result of actions of other elements.
- Process is a set of actions that must be performed to achieve a specific goal. Processes can be automatic or
  manual.
- A Task is the work that needs to be done. Tasks can be as simple as sending an email or as complex as developing a new product.
- A Connector is a line that connects elements in a diagram.
  Connectors can be one-way or two-way, and they can have time or resource constraints.
- Data is the information that passes between elements in a diagram. Data can be text, numbers, images, or other
  formats.
- An Artifact is any object that is used in a process but is not part of the diagram. Artifacts can be documents,
  tools, or other resources that are needed to complete a process.

Let's look at an example of a business process diagram that shows the process of checking a student's homework by a reviewer.

![bpmn](./img/bpmn.png)

The diagram shows the student, the examiner and the educational portal system paths. We see how actions move from one path to another, forming a common business process.

The trigger for this process is the student completing his homework, the process is repeated until the student receives a "pass" for his homework.

## UML NOTATION SEQUENCE DIAGRAM

A UML (Unified Modeling Language) sequence diagram is a graphical tool used to visualize the interactions between objects in a system at a given point in time. It shows the order of messages passed between objects and allows you to analyze the flow of control in a system.

A UML sequence diagram consists of the following elements:

- Actors are external entities that interact with the system. They can be users, other systems, or external devices.
- Objects are instances of classes that are created when the system starts and destroyed when it stops. Objects can be actors, systems, or other elements of a sequence diagram.
- Lifelines in a sequence diagram show how much time an object or actor (actors in the system) is active in the diagram. It is like a line that starts from the object and goes down the vertical axis as long as the object is active. When the object is no longer active, the lifeline ends.
- Focus of control is the period of time during which an object performs a particular action, such as calculating or waiting for a response from another object.
- Messages are requests that actors send to systems or other actors. Messages can be synchronous (wait for a response) or asynchronous (do not wait for a response).

Let's consider an example of sequence diagrams that describe the integration process of a student's learning in a course. The diagrams include the actors Student and Homework Reviewer. If we talk about system objects, then we have a User Interface (UI), which is publicly available on the Internet, on the educational platform server we have several microservices: study-api - a common orchestrator microservice, through which all student and reviewer requests to the system go, course-api - a microservice responsible for issuing materials for training, homework-api - a microservice responsible for issuing homework for lectures, studentwork-api - a microservice that saves students' homework, shows it to reviewers and saves their grades and comments for further review by students.

Let's describe the sequence of the scenario depicted in the diagrams:

1. A student requests a new lecture to study via the UI;
2. The UI makes a request for a lecture to the study-api;
3. The study-api receives the request and makes a request to the lecture source course-api;
4. The course-api receives the request and returns the lecture material to the study-api;
5. The study-api returns the lecture material to the UI;
6. The UI displays the lecture to the student.

![uml](./img/uml.png)

1. The student completes the lecture and notifies the system via the UI;
2. The UI receives the message and sends information to study-api about the student's completion of the lecture;
3. After the student completes the lecture, study-api requests homework from the homework source homework-api;
4. Homework-api returns homework materials to study-api;
5. Study-api returns homework materials to the UI;
6. The UI displays the homework to the student.

![uml](./img/uml2.png)

1. The student completes the homework and submits the solution via the UI;
2. The UI sends the solution to study-api;
3. Study-api sends the solution to studentwork-api;
4. Study-api sends a notification to the reviewer in the UI that he has a new homework to check;
5. The UI displays a notification to the reviewer.

![uml](./img/uml3.png)

1. Reviewer requests homework solution via UI;
2. UI sends homework solution request to study-api;
3. Study-api makes a request for student homework solution to studentwork-api;
4. Studentwork-api returns student solution to study-api;
5. Study-api returns student solution to UI;
6. UI displays student work to reviewer.

![uml](./img/uml4.png)

1. The reviewer grades and comments on the work via the UI;
2. The UI sends this data to study-api;
3. Study-api sends the results of the homework review to studentwork-api;
4. Study-api sends a notification to the student via the UI that his work has been reviewed;
5. The student receives a notification via the UI.

![uml](./img/uml5.png)

1. Student requests the result of his homework check via UI;
2. UI makes a request to study-api for data;
3. Study-api makes a request to studentwork-api;
4. Studentwork-api returns the results of check to study-api;
5. Study-api returns data to UI;
6. Student receives the results of check of his homework in UI.

![uml](./img/uml6.png)

This diagram is one of the types of graphical representation and, of course, it can be created using graphical tools such as Draw.IO, Visio, Miro, etc. But, in my opinion, the most correct and canonical
way to create such a diagram is the plantuml markup language, which allows you to create any UML diagrams in a text editor.

Let's see how such diagrams look in [plantuml](https://www.planttext.com/) markup.

```uml
@startuml
autonumber
title "Integrated learning process in the course"
actor "Student" as student
actor "Reviewer" as reviewer
box "Internet"
participant "UI" as ui
end box
box Educational Platform Server
participant "Study API" as study
participant "Course API" as course
participant "HomeWork API" as hw
participant "StudentWork API" as shw
end box
student -> ui: lecture request
activate student
activate ui
ui -> study: lecture request
activate study
study -> course: study materials request
activate course
course --> study: lecture materials
deactivate course
study --> ui: lecture materials
deactivate study
ui --> student: lecture materials display
deactivate student
deactivate ui
deactivate student
@enduml
```

```uml
@startuml
autonumber
title "Integrated learning process on the course"
actor "Student" as student
actor "Reviewer" as reviewer
box "Internet"
participant "UI" as ui
end box
box Educational Platform Server
participant "Study API" as study
participant "Course API" as course
participant "HomeWork API" as hw
participant "StudentWork API" as shw
end box
student -> ui: end of lecture study
activate student
activate ui
ui -> study: send information about end of lecture
activate study
study -> hw: request for homework materials
activate hw
hw --> study: homework materials
deactivate hw
study --> ui: homework materials
deactivate study
ui --> student: display homework
deactivate ui
deactivate student
@enduml
```

```uml
@startuml
autonumber
title "Integrated learning process on the course"
actor "Student" as student
actor "Reviewer" as reviewer
box "Internet"
participant "UI" as ui
end box
box Educational Platform Server
participant "Study API" as study
participant "Course API" as course
participant "HomeWork API" as hw
participant "StudentWork API" as shw
end box
student -> ui: sending solution
activate ui
ui -> study: solution
activate study
study -> shw: solution
study --> ui: sending notification about task solution for checking
deactivate study
ui --> reviewer: notification about new homework solution
deactivate ui
deactivate student
@enduml
```

```uml
@startuml
autonumber
title "Integrated learning process in the course"
actor "Student" as student
actor "Reviewer" as reviewer
box "Internet"
participant "UI" as ui
end box
box Educational Platform Server
participant "Study API" as study
participant "Course API" as course
participant "HomeWork API" as hw
participant "StudentWork API" as shw
end box
reviewer -> ui: solution request
activate reviewer
activate ui
ui -> study: solution request
activate study
study -> shw: solution request
activate shw
shw --> study: task solution
deactivate shw
study --> ui: task solution
deactivate study
ui --> reviewer: task solution
deactivate ui
deactivate reviewer
@enduml
```

```uml
@startuml
autonumber
title "Integrated learning process in the course"
actor "Student" as student
actor "Reviewer" as reviewer
box "Internet"
participant "UI" as ui
end box
box Educational Platform Server
participant "Study API" as study
participant "Course API" as course
participant "HomeWork API" as hw
participant "StudentWork API" as shw
end box
reviewer -> ui: assessment and comments
activate ui
ui -> study: assessment and comments
activate study
study -> shw: assessment and comments
study --> ui: sending a notification to the student about the assignment review
deactivate study
ui --> student: notification about the assignment review
deactivate ui
@enduml
```

```uml
@startuml
autonumber
title "Integrated learning process in the course"
actor "Student" as student
actor "Reviewer" as reviewer
box "Internet"
participant "UI" as ui
end box
box Educational Platform Server
participant "Study API" as study
participant "Course API" as course
participant "HomeWork API" as hw
participant "StudentWork API" as shw
end box
student -> ui: evaluation request
activate student
activate ui
ui -> study: evaluation request
activate study
study -> shw: evaluation request
activate shw
shw --> study: reviewer's evaluation and comments
deactivate shw
study --> ui: reviewer's evaluation and comments
deactivate study
ui --> student: reviewer's evaluation and comments
deactivate ui
deactivate student
@enduml
```

## DATA MODELS AND ER DIAGRAM

In addition to processes and integrations, it is important for us to describe how the data used in our
service will be stored and linked. A graphical artifact such as an ER diagram is best suited for this purpose.
An ER diagram (Entity Relationship Diagram) is a tool for modeling databases that allows you to visualize entities, their attributes, and the relationships between them. It helps to define the structure of data, identify relationships between elements, and determine the necessary attributes. There are several types of ER diagrams, each with its own specifics and purpose.

In order to better understand this notation, let's study its basic elements.

An ER diagram consists of entities, entity attributes, and relationships between entities.

An entity is an object that has certain properties and can be unique or repetitive. Examples of entities: products, customers, orders.

An attribute is a property of an entity that can have a value. For example, a product has attributes: name, price, quantity in stock.

A relationship is a relationship between two entities. For example, the relationship “has” between the entities “product” and “order”, where one product can be in several orders.

Let's look at one of the most common notations as an example - the physical model of the Crow's Foot notation. This diagram shows how data can be stored in a service for checking homework in an online school

![er](./img/er.png)

In this diagram we see that we have the following entities highlighted: students, student groups, reviewers, course, homework and homework results are highlighted as a separate entity.

Let's look at the relationships: we see that the entities students and student groups have a "many-to-one" relationship between them, that is, many students can study in one group, but a student cannot study in several
groups.

The relationship between reviewers and homework results is "one-to-many", that is, one reviewer checks many homework assignments, but one homework assignment is not checked by several reviewers. Reviewers also have a
"many-to-one" relationship with the course, that is, reviewers can only be inspectors for one
course.

Homework assignments relate to the course as many to one, that is, one course has many homework assignments, but a homework assignment cannot
belong to several courses.

Now let's look at the entity of homework results, this entity has a composite primary key, which consists of the identifiers of the homework, student and reviewer, thus forming a unique identifier from these three identifiers. As for the relationships, one homework has many results, because many students do one work, so the results will have a "many-to-one" relationship with the homework and "many-to-one" with the students.

It is also important to pay special attention to the entity of homework results, because this entity is an intermediate table of the relationship between the tables of students and homework, reviewers and homework. That is, there is a many-to-many relationship between the students and homework tables, because one student does many homework assignments, and one homework assignment is done by many students, but to record this data we lack these two entities, so an intermediate table is created, the same rule is true for the homework and reviewers tables: reviewers check many homework assignments, and one assignment from different students is checked by many reviewers.
