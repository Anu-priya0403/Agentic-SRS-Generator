# 🤖 Agentic SRS Generator

### AI-Powered Software Requirements Specification Generator

An intelligent, multi-agent AI system that transforms informal customer requirements into a structured **Software Requirements Specification (SRS)** document following the IEEE Std 830-1998 outline.

The system uses specialised AI agents that collaborate through a shared state to analyse user requirements, identify missing information, generate an SRS document, and validate the final output.

---

## 📌 Project Overview

Writing a Software Requirements Specification (SRS) manually can be time-consuming and requires careful analysis of customer requirements.

The **Agentic SRS Generator** simplifies this process using an agent-based AI architecture.

Users can provide raw, unstructured requirements in natural language. The system processes these requirements through a pipeline of specialised agents to generate a well-organised SRS document.

Unlike a basic text-generation tool, the system can identify incomplete requirements, ask follow-up questions, and review its generated output before completion.

---

## 🎯 Key Features

- **Natural Language Input:** Accepts informal and unstructured software requirements.
- **Multi-Agent Architecture:** Uses specialised AI agents to perform different stages of SRS generation.
- **Requirement Analysis:** Analyses customer inputs and extracts relevant software requirements.
- **Missing Information Detection:** Identifies incomplete or unclear requirements.
- **Interactive Clarification:** Asks follow-up questions to collect missing information.
- **Automated SRS Generation:** Generates structured SRS documentation.
- **Self-Validation:** Reviews the generated document for completeness and consistency.
- **IEEE Std 830-1998 Structure:** Organises the output according to the IEEE 830 SRS outline.

---

## 🏗️ System Architecture

The project follows a multi-agent pipeline in which specialised agents collaborate using a shared state dictionary.

### Workflow

1. **User Input:** The user provides informal project requirements.
2. **Requirement Analysis Agent:** Analyses the input and extracts important requirements.
3. **Clarification Agent:** Identifies missing information and asks follow-up questions.
4. **SRS Generation Agent:** Converts the collected requirements into a structured SRS document.
5. **Validation Agent:** Reviews the generated document and checks its completeness.
6. **Final Output:** Produces the final Software Requirements Specification.

### Architecture Flow

```text
       User Requirements
               |
               v
     Requirement Analysis
               |
               v
     Missing Information?
               |
        +------+------+
        |             |
       Yes            No
        |             |
        v             |
  Ask User Questions  |
        |             |
        +------+------+
               |
               v
       SRS Generation
               |
               v
       SRS Validation
               |
               v
       Final SRS Document
```

---

## 🛠️ Technologies Used

The project uses the following technologies and tools:

- Python
- Large Language Models (LLMs)
- Agent-based AI architecture
- Shared-state workflow
- Natural Language Processing
- IEEE Std 830-1998 SRS guidelines

*The exact framework and model dependencies should match the implementations in the project.*

---

## 📂 Project Structure

The project is organised into modules responsible for different stages of the SRS generation pipeline.

```text
Agentic-SRS-Generator/
│
├── agents/
│   ├── requirement_agent.py
│   ├── clarification_agent.py
│   ├── generation_agent.py
│   └── validation_agent.py
│
├── main.py
├── requirements.txt
├── README.md
└── .gitignore
```

*Note: This is an illustrative structure. Update it to reflect your actual project files and folder names.*

---

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/Agentic-SRS-Generator.git
```

### 2. Navigate to the Project Directory

```bash
cd Agentic-SRS-Generator
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

**Windows:**

```bash
venv\Scripts\activate
```

**Linux / macOS:**

```bash
source venv/bin/activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Configure Environment Variables

If your project uses an API key, configure it through a `.env` file or environment variable.

Never upload API keys or credentials to GitHub.

### 7. Run the Project

```bash
python main.py
```

*Replace the command if your actual application uses a different entry point.*

---

## 📄 Expected Output

The system generates a structured Software Requirements Specification containing relevant sections based on the IEEE 830 outline, such as:

- Introduction
- Overall Description
- Specific Requirements
- Functional Requirements
- Non-Functional Requirements
- External Interface Requirements
- System Constraints

The final document is intended to provide a clear and organised representation of the customer's software requirements.

---

## 💡 Use Cases

- Software development projects
- Academic software engineering assignments
- Requirements engineering automation
- Early-stage software product planning
- Converting client discussions into structured documentation

---

## 🚀 Future Enhancements

- Export generated SRS documents to PDF and DOCX.
- Add a web-based user interface.
- Support multiple SRS templates and standards.
- Improve requirement traceability.
- Add automated requirement prioritisation.
- Integrate additional AI agents for advanced quality checks.

---

## 👩‍💻 Project Information

**Project Name:** Agentic SRS Generator

**Domain:** Artificial Intelligence | Generative AI | Software Engineering

**Approach:** Multi-Agent AI System

**Documentation Standard:** IEEE Std 830-1998

---

## 📜 License

This project is intended for educational and learning purposes. Add an appropriate open-source license before permitting reuse or redistribution.

---

⭐ If you find this project interesting, consider starring the repository!
