export default function OverviewPage() {
  const weeklyData = [20, 28, 16, 23, 32, 12, 26];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const yTicks = [40, 32, 24, 16, 8, 0];
  const chartMax = 40;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
        <article className="rounded-md border border-[#dde2ed] bg-[#eef1f8] p-3">
          <p className="text-[12px] text-[#343d56]">Total Images Identified</p>
          <p className="mt-2 text-[34px] font-semibold leading-none text-[#11172b]">26</p>
          <p className="mt-2 text-[11px] text-[#8a93a7]">Total Overall Images Processed</p>
        </article>

        <article className="rounded-md border border-[#dde2ed] bg-[#eef1f8] p-3">
          <p className="text-[12px] text-[#343d56]">To Be Processed</p>
          <p className="mt-2 text-[34px] font-semibold leading-none text-[#11172b]">132</p>
          <p className="mt-2 text-[11px] text-[#8a93a7]">Currently ongoing</p>
        </article>

        <article className="rounded-md border border-[#dde2ed] bg-[#eef1f8] p-3" />
      </div>

      <section className="rounded-xl border border-[#d7dfee] bg-[#eef1f8] p-5">
        <h2 className="text-[17px] font-semibold leading-tight text-[#2928a8] sm:text-[18px]">
          Total Images Identified (Weekly)
        </h2>

        <div className="mt-4 rounded-lg border border-[#dbe3f1] bg-[#edf1f9] px-4 py-4">
          <div className="grid grid-cols-[34px_1fr] gap-y-3">
            {yTicks.map((value) => (
              <div key={value} className="contents">
                <span className="text-[11px] text-[#8a93a7]">{value}</span>
                <div className="mt-[7px] h-px bg-[#ced7e7]" />
              </div>
            ))}
          </div>

          <div className="ml-[34px] mr-3 mt-[-138px] flex h-[138px] items-end justify-between gap-3">
            {weeklyData.map((value, index) => (
              <div key={days[index]} className="flex flex-1 items-end justify-center">
                <div
                  className="w-[28px] rounded-[4px] bg-[#2624a7] shadow-[0_4px_10px_-6px_rgba(38,36,167,0.9)]"
                  style={{ height: `${(value / chartMax) * 138}px` }}
                />
              </div>
            ))}
          </div>

          <div className="ml-[34px] mr-3 mt-2 flex items-center justify-between gap-3">
            {days.map((day) => (
              <span key={day} className="flex-1 text-center text-[11px] text-[#6c7690]">
                {day}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-[#4f5873]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#2624a7]" />
          Identified Images
        </div>
      </section>
    </div>
  );
}
