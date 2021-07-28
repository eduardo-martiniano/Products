
using System.Threading.Tasks;
using ProductApi.Domain.Entities;

namespace ProductApi.Domain.Contracts.Repositories
{
    public interface IBuyRepository
    {
         Task<Buy> Save(Buy buy);
    }
}