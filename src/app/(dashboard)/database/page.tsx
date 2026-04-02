export default function DatabasePage() {
  const rows = [
    ["AAAA.jpg", "N12345", "Cessna 172", "T7243d21", "SkyHigh Aviation", "2018"],
    ["BBBB.jpg", "N67890", "Piper PA-28", "28-7625134", "BlueHorizon LLC", "2015"],
    ["CCCC.jpg", "N11223", "Boeing 737-800", "40578", "United Airlines", "2020"],
    ["DDDD.jpg", "N44556", "Cessna 182T", "18281672", "Aviation Academy Inc", "2012"],
    ["EEEE.jpg", "N77889", "Cirrus SR22", "4521", "Private Owner", "2021"],
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="relative block">
            <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#97a0b5]">
              🔎
            </span>
            <input
              type="text"
              placeholder="Search Database..."
              className="h-7 w-[170px] rounded-md border border-[#d6dbea] bg-[#eef1f8] pl-6 pr-2 text-[10px] text-[#3d4661] placeholder:text-[#97a0b5] outline-none"
            />
          </label>
          <button className="grid h-7 w-7 place-items-center rounded-md border border-[#d6dbea] bg-[#eef1f8] text-[12px] text-[#6f7891]">
            ⏃
          </button>
        </div>

        <button className="rounded-md bg-[#3f3cb9] px-3 py-1.5 text-[10px] font-medium text-white">
          Export Database
        </button>
      </div>

      <div className="overflow-hidden rounded-md border border-[#d8deea] bg-[#eef1f8]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-[10px] text-[#46516d]">
            <thead className="border-b border-[#d8deea] bg-[#eaedf5] text-[#6c7690]">
              <tr>
                <th className="px-3 py-2 font-medium">FileName</th>
                <th className="px-3 py-2 font-medium">Registration</th>
                <th className="px-3 py-2 font-medium">AircraftName</th>
                <th className="px-3 py-2 font-medium">SerialNo.</th>
                <th className="px-3 py-2 font-medium">Owner</th>
                <th className="px-3 py-2 font-medium">Year</th>
                <th className="px-3 py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-b border-[#dde2ed] last:border-b-0">
                  <td className="px-3 py-3">{row[0]}</td>
                  <td className="px-3 py-3">{row[1]}</td>
                  <td className="px-3 py-3">{row[2]}</td>
                  <td className="px-3 py-3">{row[3]}</td>
                  <td className="px-3 py-3">{row[4]}</td>
                  <td className="px-3 py-3">{row[5]}</td>
                  <td className="px-3 py-3 text-right text-[#7f89a3]">⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#d8deea] px-3 py-2 text-[9px] text-[#7f89a3]">
          <span>Showing 1 to 4 of 154 images</span>
          <div className="flex items-center gap-2">
            <button className="grid h-4.5 w-4.5 place-items-center rounded-[3px] bg-[#3f3cb9] text-[8px] text-white">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
