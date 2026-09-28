# Exercise 3 – Data Story: TV Energy Consumption

## Overview

In this exercise, you will develop a **data story** based on the **TV Energy Consumption dataset**. Using the website created in **Exercise 0.2**, you will extend your work to present a meaningful narrative supported by data visualisations.

Your goal is to communicate insights from the dataset in a clear and engaging way through your **website and written explanation**.

You must use the **Exercise 3 folder in your existing forked repository** and reuse the files created in **Exercise 0.2**.

---

## Data Story

### Audience
The audience is Australian consumers who are comparing televisions and want to understand how screen size relates to annual electricity use.

### Main Question
How does television screen size affect annual energy consumption?

### Purpose
The visualizations help consumers compare the average labelled energy use of small, medium and large TVs, and see how energy use varies between individual models.

### Story Overview

The story uses two KNIME visualizations made from the cleaned course dataset:

- A bar chart compares mean labelled annual energy use across small, medium and large TVs.
- A scatterplot compares screen size in inches with labelled annual energy use for individual TVs.

In this dataset, average labelled annual energy use was 748.02 kWh for large TVs, 381.87 kWh for medium TVs and 127.09 kWh for small TVs. The scatterplot also shows that models of similar sizes can have different energy-use figures. These results help shoppers compare products, but they do not predict the exact electricity use of a particular household.

The website presents both charts with captions and context for readers.

---

## About the Data

### Data Source

The dataset used in this project contains information about **television models and their energy consumption characteristics**, including power usage, screen size, technology type, and efficiency ratings.

The dataset was provided as part of the course materials.

### Data Processing

The original dataset contained 4,724 television records.

The data was processed in KNIME before being used for the visualisations.

The processing included:

- selecting attributes relevant to the analysis
- converting television screen size into inches
- grouping televisions into Small, Medium and Large screen-size categories
- checking the analytical variables for missing values
- identifying and removing 256 duplicate television records

No rows were removed during the missing-value processing stage for the variables required for the analysis.

After duplicate removal, the cleaned dataset contained 4,468 records.

This cleaned dataset was exported as `tvcleaned.csv` and is used for the Exercise 3 analysis.

### Privacy

The dataset does not contain any **personal or sensitive information**. It focuses solely on product specifications and energy consumption data related to television devices.

### Accuracy and Limitations

While the dataset provides useful information about TV energy consumption, there are some limitations:

- The dataset may not include **all available television models**
- Some information may be **outdated or incomplete**
- Energy consumption may vary depending on **real-world usage conditions**

These factors should be considered when interpreting the visualisations.

### Ethics

When presenting data visualisations, it is important to ensure that the information is represented **accurately and responsibly**.

This project follows ethical data visualisation practices by:

- Avoiding misleading visual representations
- Clearly explaining the context of the data
- Presenting information transparently so viewers can interpret the results correctly

---

## AI Declaration

Generative AI was used to inspect the cleaned dataset, provide guidance for creating the KNIME visualizations, draft and edit explanatory text, and build the Exercise 3 webpage. The charts were created in KNIME by the student and added to the page as screenshots. The student should review the figures and interpretation before submission.

---

## Website Storytelling

The Exercise 3 folder has its own home page and Data Story page. It reuses shared files and links to pages in Exercise 0.2, leaving the original Exercise 0.2 files unchanged. The [data-story.html](data-story.html) page presents screenshots of both completed charts with captions and supporting text.
