using System.Threading.Tasks;
using ProductApi.Entities;

namespace ProductApi.Contracts
{
    public interface IBuyRepository
    {
         Task<Buy> Save(Buy buy);
    }
}