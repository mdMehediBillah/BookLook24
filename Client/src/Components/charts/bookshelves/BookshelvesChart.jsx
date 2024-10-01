import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BookshelvesChart = ({
  bookshelves,
  books,
  donatedBooks,
  borrowedBooks,
}) => {
  // Group and count bookshelves by month
  const groupedByMonthBookshelves = bookshelves.reduce((acc, bookshelf) => {
    const month = new Date(bookshelf.createdAt).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Group and count books by month
  const groupedByMonthBooks = books.reduce((acc, book) => {
    const month = new Date(book.createdAt).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Group and count donated books by month
  const groupedByMonthDonatedBooks = donatedBooks.reduce((acc, book) => {
    const month = new Date(book.createdAt).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Group and count donated books by month
  const groupedByMonthBorrowedBooks = borrowedBooks.reduce((acc, book) => {
    const month = new Date(book.createdAt).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Short month names for better chart readability
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Create data array with the counts for each month
  const chartData = months.map((month) => ({
    month,
    bookshelf: groupedByMonthBookshelves[month] || 0,
    books: groupedByMonthBooks[month] || 0,
    "Donated Books": groupedByMonthDonatedBooks[month] || 0,
    "Borrowed Books": groupedByMonthBorrowedBooks[month] || 0,
  }));

  return (
    <section className="users-chart-container">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} barSize={15}>
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: " #fff5f5",
              borderRadius: "5px",
              color: "dark",
            }}
            labelStyle={{ display: "none" }}
            cursor={{ fill: "none" }}
          />
          <Bar dataKey="bookshelf" fill="#73ced0" />
          <Bar dataKey="books" fill="#d41212" />
          <Bar dataKey="Donated Books" fill="#ff9f1c" />
          <Bar dataKey="Borrowed Books" fill="#52b788" />
        </BarChart>
      </ResponsiveContainer>
      <h4 className="text-center py-1">
        Fig.1: Bookshelves, Books, Donated Books, & Borrowed Books
      </h4>
    </section>
  );
};

export default BookshelvesChart;
