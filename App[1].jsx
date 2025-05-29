import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 
import { Calendar } from "@/components/ui/calendar"; 
import { format } from "date-fns"; 

export default function HotelWebsite() {
  const [page, setPage] = useState("Kezdőlap");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [results, setResults] = useState([]);

  const rooms = [
    { type: "Standard szoba", price: 25000 },
    { type: "Deluxe szoba", price: 35000 },
    { type: "Családi lakosztály", price: 45000 },
  ];

  const handleSearch = () => {
    if (!startDate || !endDate) return;
    setResults(rooms);
  };

  return (
    <div
      className="min-h-screen text-gray-800"
      style={{
        backgroundColor: "#f9f9f9",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='1' height='1' fill='%23e0e0e0'/></svg>\")",
      }}
    >
      <header
        className="text-white pt-12 pb-4 px-6 shadow-md text-center relative"
        style={{ backgroundColor: "rgb(240,210,140)", fontFamily: "'Playfair Display', serif" }}
      >
        <h1 className="text-6xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>The Halcyon</h1>
        <div className="my-2 text-black">
          <hr className="border-t border-black w-1/2 mx-auto mb-2" />
          <p className="text-sm uppercase tracking-widest">The hotel</p>
          <hr className="border-t border-black w-1/2 mx-auto mt-2" />
        </div>
        <nav className="flex justify-between px-12 mt-6 text-sm font-medium text-black">
          {["Kezdőlap", "Szobák", "Étkezés", "Foglalás"].map((menu) => (
            <button key={menu} onClick={() => setPage(menu)}>
              {menu}
            </button>
          ))}
        </nav>
      </header>

      <main className="p-6">
        {page === "Kezdőlap" && (
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>The Halcyon</h1>
              <h2 className="text-2xl text-[rgb(217,181,105)]">Stílusos kikapcsolódás</h2>
            </div>
            <div>
              <blockquote className="border p-6 rounded-lg bg-gray-100 text-gray-700 shadow">
                <p className="text-lg italic">
                  "Prémium szolgáltatás, magas minőség, örömteli élmények az egész család számára. Itt nem csak a pénzed számít, itt te vagy a lényeg. Ha panaszod van, mondd a szomszédnak, csak mint otthon."
                </p>
              </blockquote>
            </div>
          </section>
        )}

        {page === "Szobák" && (
          <section className="grid gap-4 md:grid-cols-3">
            {rooms.map((room, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{room.type}</h2>
                  <p>{room.price.toLocaleString()} Ft / éj</p>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {page === "Étkezés" && (
          <section className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Étterem</h2>
            <p>Reggeli, ebéd és vacsora - helyi ízek modern tálalásban.</p>
          </section>
        )}

        {page === "Foglalás" && (
          <section className="max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Foglalás</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
              <div>
                <p className="mb-2 font-medium">Érkezés dátuma:</p>
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
              </div>
              <div>
                <p className="mb-2 font-medium">Távozás dátuma:</p>
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
              </div>
            </div>
            <Button onClick={handleSearch}>Keresés</Button>

            {results.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Elérhető szobák:</h3>
                <ul className="space-y-2">
                  {results.map((r, i) => (
                    <li key={i} className="p-3 border rounded-xl shadow">
                      {r.type} – {r.price.toLocaleString()} Ft / éj
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {page === "Kezdőlap" && (
          <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <blockquote className="border p-6 rounded-lg bg-gray-100 text-gray-700 shadow">
                <h2 className="text-2xl font-semibold mb-2">Elhelyezkedés</h2>
                <p>A The Halcyon Hotel a belváros szívében, a Kálvin tér közelében található, a híres Rum Hotel helyén. Könnyen megközelíthető tömegközlekedéssel és gyalogosan is.</p>
              </blockquote>
            </div>
            <div className="w-full h-full bg-gray-100 border rounded-xl shadow p-4">
              <img
                src="/halcyon-map.png"
                alt="Térkép Kálvin tér - Halcyon Hotel"
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
