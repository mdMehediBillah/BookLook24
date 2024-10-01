import "./AreaChartBookshelves.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaChartBookshelves = ({ bookshelves, books }) => {
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

  // Generate chart data with default values for missing months
  const chartData = months.map((month) => ({
    month,
    bookshelf: groupedByMonthBookshelves[month] || 0,
    books: groupedByMonthBooks[month] || 0,
  }));

  // Debugging: Log the processed data
  // console.log("Chart Data:", chartData);

  return (
    <section className="pt-5 pb-10" style={{ width: "40vw", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorBookshelf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBooks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(tick) => `${tick}`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="bookshelf"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorBookshelf)"
          />
          <Area
            type="monotone"
            dataKey="books"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorBooks)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <h4 className="chart-title py-4 text-center">
        Fig.2: Annual Size of Bookshelves and Books
      </h4>
    </section>
  );
};

export default AreaChartBookshelves;
