import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 30,
  },
  table: {
    //display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 0,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    
  },
  tableCell: {
    width: '16%',  // Adjust width to match the number of columns
    padding: 5,
    textAlign: 'center',
    fontSize: 8,  // Reduced font size
    borderRightWidth: 1,  // Add right border to separate columns
    borderRightColor: '#000',  // Set border color
    
  },
  tableCelllast: {
    width: '14%',  // Adjust width to match the number of columns
    padding: 5,
    textAlign: 'center',
    fontSize: 8,  // Reduced font size
   
  },
  tableHeader: {
    fontWeight: 'ultrabold',
    fontSize: 11,  // Adjust font size for header
    backgroundColor: '#f1f1f1',  // Light background for the header
  //  borderBottomWidth: 2,  // More distinct bottom border for the header
  //  borderBottomColor: '#000',  // Set border color for the header
  },
  tableRowLast: {
    borderBottomWidth: 0,  // Remove the bottom border for the last row
  },
});

export const downloadPDF = (tasks: any[]) => {
  if (!tasks.length) {
    alert("No data to download.");
    return;
  }

  const doc = (
    <Document>
      <Page style={styles.page}>
        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell,styles.tableHeader]}>Name</Text>
            <Text style={[styles.tableCell,styles.tableHeader]}>Email</Text>
            <Text style={[styles.tableCell,styles.tableHeader]}>Phone</Text>
            <Text style={[styles.tableCell,styles.tableHeader]}>Designation</Text>
            <Text style={[styles.tableCell,styles.tableHeader]}>Salary</Text>
            <Text style={[styles.tableCell,styles.tableHeader]}>Joining Date</Text>
            <Text style={[styles.tableCelllast,styles.tableHeader]}>Status</Text>
          </View>

          {/* Table Rows */}
          {tasks.map((task, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index === tasks.length - 1 ? { borderBottomWidth: 0 } : {}  // Remove the border for the last row
              ]}
              //style={[styles.tableRow, index === tasks.length -1 && styles.tableRowLast]} // Remove last row border
            >
              <Text style={styles.tableCell}>{task.name}</Text>
              <Text style={styles.tableCell}>{task.email}</Text>
              <Text style={styles.tableCell}>{task.phone}</Text>
              <Text style={styles.tableCell}>{task.designation}</Text>
              <Text style={styles.tableCell}>{task.salary}</Text>
              <Text style={styles.tableCell}>{task.joiningdate}</Text>
              <Text style={styles.tableCelllast}>{task.status}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  // Generate PDF blob and trigger download
  pdf(doc).toBlob().then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", "employee_data.pdf");
    a.click();
    window.URL.revokeObjectURL(url);
  }).catch(error => {
    console.error("Error generating PDF: ", error);
  });
};
