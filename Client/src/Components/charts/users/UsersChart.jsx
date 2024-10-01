import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UsersChart = () => {
  const data = [
    {
      month: "January",
      bookshelf: 1,
      books: 1,
      donatedBooks: 2,
      borrowedBooks: 2,
    },
    {
      month: "February",
      bookshelf: 12,
      books: 21,
      donatedBooks: 22,
      borrowedBooks: 22,
    },
    {
      month: "March",
      bookshelf: 18,
      books: 19,
      donatedBooks: 20,
      borrowedBooks: 2,
    },
    {
      month: "April",
      bookshelf: 51,
      books: 16,
      donatedBooks: 32,
      borrowedBooks: 12,
    },
    {
      month: "June",
      bookshelf: 1,
      books: 34,
      donatedBooks: 21,
      borrowedBooks: 7,
    },
    {
      month: "July",
      bookshelf: 13,
      books: 24,
      donatedBooks: 21,
      borrowedBooks: 17,
    },

    {
      month: "August",
      bookshelf: 3,
      books: 24,
      donatedBooks: 11,
      borrowedBooks: 9,
    },

    {
      month: "September",
      bookshelf: 33,
      books: 44,
      donatedBooks: 31,
      borrowedBooks: 19,
    },

    {
      month: "October",
      bookshelf: 22,
      books: 31,
      donatedBooks: 22,
      borrowedBooks: 9,
    },

    {
      month: "November",
      bookshelf: 32,
      books: 21,
      donatedBooks: 12,
      borrowedBooks: 12,
    },

    {
      month: "December",
      bookshelf: 12,
      books: 11,
      donatedBooks: 5,
      borrowedBooks: 2,
    },
  ];
  return (
    <section className="users-chart-container">
      <h4 className="chart-title"> Users Bar Chart </h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={15}>
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffefd5",
              borderRadius: "5px",
              color: "dark",
            }}
            labelStyle={{ display: "none" }}
            cursor={{ fill: "none" }}
          />

          <Bar dataKey="bookshelf" fill="#8884d8" />
          <Bar dataKey="books" fill="#a2d2ff" />
          <Bar dataKey="donatedBooks" fill="#82ca9d" />
          <Bar dataKey="borrowedBooks" fill="#0077b6" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};


export default UsersChart;
