import{ResponsiveContainer,
    BarChart,
    Bar,
   XAxis,
   YAxis,
   Tooltip,
   CartesianGrid
} from 'recharts';
const Barcharts = () => {
    const data=[
    {month:"jan",task:20},
{month:"feb" ,task:30},
{month:"march", task:40},
{month:"april",task:20},
{month:"may", task:50},
{month:"june", task:70},
{month:"july",task:50}
];
  return (
    <div className="w-full h-70 mt-10 bg-white rounded-lg shadow p-4" >
     
        <ResponsiveContainer className = "w-100% h-100% " >
   <BarChart data={data}>
    <XAxis dataKey="month"/>
    <YAxis/>
    <Tooltip/>
    <Bar dataKey="task" fill="red" />
    </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default Barcharts;